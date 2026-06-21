"""Pet listing router: list/create with filters, retrieve/update/delete."""
from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from .. import models, schemas
from ..db import get_db
from ..deps import get_current_user
from ..formparse import is_upload, nest_form
from ..notifications import notify
from ..pagination import paginate_serialized
from ..uploads import save_upload

router = APIRouter(prefix="/petlisting", tags=["petlisting"])

_PET_BOOL = {
    "is_friendly", "is_adventurous", "is_extroverted", "is_introverted",
    "is_energetic", "is_spn", "is_vaccinated",
}
_PET_INT = {"age", "size", "weight"}
_PET_IMG = {"image1", "image2", "image3"}
_PET_STR = {
    "animal_type", "name", "sex", "colour", "breed", "description", "special_needs",
}


def _build_pet_data(pet_form: dict) -> dict:
    data: dict = {}
    for key, value in pet_form.items():
        if key in _PET_BOOL:
            data[key] = str(value).lower() in ("true", "1", "yes")
        elif key in _PET_INT:
            data[key] = int(value)
        elif key in _PET_IMG:
            if is_upload(value):
                data[key] = save_upload(value)
        elif key in _PET_STR:
            data[key] = value
    return data


# --------------------------------------------------------------------------- #
# List / Create
# --------------------------------------------------------------------------- #
@router.get("/")
def list_petlistings(request: Request, db: Session = Depends(get_db)):
    q = request.query_params
    stmt = select(models.PetListing).join(models.Pet)

    shelter_name = q.get("shelter")
    if shelter_name:
        account = db.scalar(
            select(models.Account).where(models.Account.name == shelter_name)
        )
        shelter = account.shelter if account else None
        stmt = stmt.where(models.PetListing.shelter_id == (shelter.id if shelter else -1))

    status_filter = q.get("status", "AVAILABLE")
    if status_filter:
        stmt = stmt.where(func.lower(models.PetListing.status) == status_filter.lower())

    for param, col in [
        ("animal", models.Pet.animal_type),
        ("breed", models.Pet.breed),
        ("colour", models.Pet.colour),
        ("sex", models.Pet.sex),
    ]:
        val = q.get(param)
        if val:
            stmt = stmt.where(func.lower(col) == val.lower())
    for param, col in [("age", models.Pet.age), ("size", models.Pet.size)]:
        val = q.get(param)
        if val:
            stmt = stmt.where(col == int(val))

    sort = q.get("sort", "name")
    if sort == "age":
        stmt = stmt.order_by(models.Pet.age)
    elif sort == "size":
        stmt = stmt.order_by(models.Pet.size)
    else:
        stmt = stmt.order_by(models.Pet.name)

    items = list(db.scalars(stmt).all())
    return paginate_serialized(items, schemas.PetListingOut, request)


@router.post("/", response_model=schemas.PetListingOut, status_code=status.HTTP_201_CREATED)
async def create_petlisting(
    request: Request,
    user: models.Account = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if user.shelter is None:
        raise HTTPException(401, "You do not have permission to create a pet listing")

    form = nest_form(list((await request.form()).multi_items()))
    pet_data = _build_pet_data(form.get("pet", {}))
    pet = models.Pet(**pet_data)
    db.add(pet)
    db.flush()

    listing = models.PetListing(
        shelter_id=user.shelter.id,
        status=form.get("status"),
        adoption_fee=int(form.get("adoption_fee", 0)),
        pet_id=pet.id,
    )
    db.add(listing)
    db.flush()

    _notify_interested_seekers(db, listing, pet_data)
    db.commit()
    db.refresh(listing)
    return listing


def _notify_interested_seekers(db: Session, listing: models.PetListing, pet_data: dict):
    url = f"/petdetail/{listing.id}"
    is_special_needs = bool(pet_data.get("special_needs"))
    for seeker in db.scalars(select(models.Seeker)).all():
        if (
            seeker.animal_preference == pet_data.get("animal_type")
            or seeker.breed_preference == pet_data.get("breed")
            or seeker.age_preference == pet_data.get("age")
            or seeker.sex_preference == pet_data.get("sex")
            or seeker.size_preference == pet_data.get("size")
            or seeker.open_to_special_needs_animals == is_special_needs
        ):
            db.add(models.Notification(
                user_id=seeker.account_id, url=url, msg="A new pet you might like!"
            ))


# --------------------------------------------------------------------------- #
# Detail
# --------------------------------------------------------------------------- #
def _get_listing_or_404(db: Session, pk: int) -> models.PetListing:
    listing = db.get(models.PetListing, pk)
    if listing is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Not found.")
    return listing


@router.get("/{pk}/", response_model=schemas.PetListingOut)
def retrieve_petlisting(pk: int, db: Session = Depends(get_db)):
    return _get_listing_or_404(db, pk)


@router.patch("/{pk}/", response_model=schemas.PetListingOut)
@router.put("/{pk}/", response_model=schemas.PetListingOut)
async def update_petlisting(
    pk: int,
    request: Request,
    user: models.Account = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    listing = _get_listing_or_404(db, pk)
    if listing.shelter.account_id != user.id:
        raise HTTPException(403, "You do not have permission to update this listing.")

    form = nest_form(list((await request.form()).multi_items()))
    for key, value in _build_pet_data(form.get("pet", {})).items():
        setattr(listing.pet, key, value)
    if "status" in form:
        listing.status = form["status"]
    if "adoption_fee" in form:
        listing.adoption_fee = int(form["adoption_fee"])
    db.commit()
    db.refresh(listing)
    return listing


@router.delete("/{pk}/", status_code=status.HTTP_204_NO_CONTENT)
def delete_petlisting(
    pk: int,
    user: models.Account = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    listing = _get_listing_or_404(db, pk)
    if listing.shelter.account_id != user.id:
        raise HTTPException(403, "You do not have permission to delete this listing.")
    db.delete(listing.pet)  # cascade removes the listing
    db.commit()
