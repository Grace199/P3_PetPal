"""Accounts router: signup, seeker/shelter profile CRUD, shelter list."""
from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import or_, select
from sqlalchemy.orm import Session

from .. import models, schemas
from ..db import get_db
from ..deps import get_current_user
from ..formparse import is_upload, nest_form
from ..pagination import paginate_serialized
from ..security import hash_password
from ..uploads import save_upload

router = APIRouter(prefix="/accounts", tags=["accounts"])


# --------------------------------------------------------------------------- #
# Signup
# --------------------------------------------------------------------------- #
def _create_account(db: Session, account: schemas.AccountSignUp) -> models.Account:
    if db.scalar(select(models.Account).where(models.Account.email == account.email)):
        raise HTTPException(400, {"email": ["account with this email already exists."]})
    if db.scalar(select(models.Account).where(models.Account.name == account.name)):
        raise HTTPException(400, {"name": ["account with this name already exists."]})
    instance = models.Account(
        email=account.email,
        name=account.name,
        password=hash_password(account.password1),
    )
    db.add(instance)
    db.flush()
    return instance


@router.post("/seeker/signup/", status_code=status.HTTP_201_CREATED)
def seeker_signup(payload: schemas.SeekerSignUp, db: Session = Depends(get_db)):
    account = _create_account(db, payload.account)
    seeker = models.Seeker(
        account_id=account.id,
        city=payload.city,
        province=payload.province,
        phone_number=payload.phone_number,
    )
    db.add(seeker)
    db.commit()
    return {"account": {"email": account.email, "name": account.name}}


@router.post("/shelter/signup/", status_code=status.HTTP_201_CREATED)
def shelter_signup(payload: schemas.ShelterSignUp, db: Session = Depends(get_db)):
    account = _create_account(db, payload.account)
    shelter = models.Shelter(
        account_id=account.id,
        address=payload.address,
        city=payload.city,
        province=payload.province,
        phone_number=payload.phone_number,
        description=payload.description,
    )
    db.add(shelter)
    db.commit()
    return {"account": {"email": account.email, "name": account.name}}


# --------------------------------------------------------------------------- #
# Seeker detail / update / delete
# --------------------------------------------------------------------------- #
def _get_seeker_or_404(db: Session, pk: int) -> models.Seeker:
    seeker = db.get(models.Seeker, pk)
    if seeker is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Not found.")
    return seeker


@router.get("/seeker/{pk}/", response_model=schemas.SeekerOut)
def seeker_retrieve(
    pk: int,
    user: models.Account = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    seeker = _get_seeker_or_404(db, pk)
    if user.id == seeker.account_id:
        return seeker

    # A shelter may view a seeker only with a pending application between them.
    shelter = user.shelter
    if shelter is None:
        raise HTTPException(401, "You do not have permission to view this profile")
    has_pending = db.scalar(
        select(models.Application).where(
            models.Application.seeker_id == seeker.id,
            models.Application.shelter_id == shelter.id,
            models.Application.status == "pending",
        )
    )
    if not has_pending:
        raise HTTPException(401, "You do not have permission to view this profile")
    return seeker


def _apply_account_updates(
    db: Session, account: models.Account, account_data: dict
) -> None:
    if "name" in account_data and account_data["name"]:
        account.name = account_data["name"]
    if "avatar" in account_data and is_upload(account_data["avatar"]):
        account.avatar = save_upload(account_data["avatar"])
    pw1 = account_data.get("password1")
    if pw1:
        if pw1 != account_data.get("password2"):
            raise HTTPException(400, {"password2": "The two password fields didn't match"})
        if len(pw1) < 8:
            raise HTTPException(400, {"password1": "This password is too short."})
        account.password = hash_password(pw1)


_SEEKER_FIELDS = {
    "city", "province", "phone_number", "animal_preference", "breed_preference",
    "age_preference", "sex_preference", "size_preference",
    "open_to_special_needs_animals",
}
_INT_FIELDS = {"phone_number", "age_preference", "size_preference"}
_BOOL_FIELDS = {"open_to_special_needs_animals"}


def _coerce(field: str, value):
    if field in _INT_FIELDS:
        return int(value) if value not in ("", None) else None
    if field in _BOOL_FIELDS:
        return str(value).lower() in ("true", "1", "yes")
    return value


@router.patch("/seeker/{pk}/", response_model=schemas.SeekerOut)
@router.put("/seeker/{pk}/", response_model=schemas.SeekerOut)
async def seeker_update(
    pk: int,
    request: Request,
    user: models.Account = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    seeker = _get_seeker_or_404(db, pk)
    if user.id != seeker.account_id:
        raise HTTPException(401, "You do not have permission to update this seeker")

    form = nest_form(list((await request.form()).multi_items()))
    if "phone_number" in form:
        pn = form["phone_number"]
        if pn not in ("", None) and len(str(pn)) != 10:
            raise HTTPException(400, {"phone_number": "Please enter a valid Canadian phone number."})

    _apply_account_updates(db, seeker.account, form.get("account", {}))
    for field in _SEEKER_FIELDS:
        if field in form:
            setattr(seeker, field, _coerce(field, form[field]))
    db.commit()
    db.refresh(seeker)
    return seeker


@router.delete("/seeker/{pk}/", status_code=status.HTTP_204_NO_CONTENT)
def seeker_delete(
    pk: int,
    user: models.Account = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    seeker = _get_seeker_or_404(db, pk)
    if user.id != seeker.account_id:
        raise HTTPException(401, "You do not have permission to delete this seeker")
    db.delete(seeker.account)  # cascade removes the seeker
    db.commit()


# --------------------------------------------------------------------------- #
# Shelter detail / update / delete / list
# --------------------------------------------------------------------------- #
def _get_shelter_or_404(db: Session, pk: int) -> models.Shelter:
    shelter = db.get(models.Shelter, pk)
    if shelter is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Not found.")
    return shelter


@router.get("/shelter/{pk}/", response_model=schemas.ShelterOut)
def shelter_retrieve(pk: int, db: Session = Depends(get_db)):
    return _get_shelter_or_404(db, pk)


_SHELTER_FIELDS = {"address", "city", "province", "phone_number", "description"}


@router.patch("/shelter/{pk}/", response_model=schemas.ShelterOut)
@router.put("/shelter/{pk}/", response_model=schemas.ShelterOut)
async def shelter_update(
    pk: int,
    request: Request,
    user: models.Account = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    shelter = _get_shelter_or_404(db, pk)
    if user.id != shelter.account_id:
        raise HTTPException(401, "You do not have permission to update this shelter")

    form = nest_form(list((await request.form()).multi_items()))
    if "phone_number" in form:
        pn = form["phone_number"]
        if pn not in ("", None) and len(str(pn)) != 10:
            raise HTTPException(400, {"phone_number": "Please enter a valid Canadian phone number."})

    _apply_account_updates(db, shelter.account, form.get("account", {}))
    for field in _SHELTER_FIELDS:
        if field in form:
            value = int(form[field]) if field == "phone_number" else form[field]
            setattr(shelter, field, value)
    db.commit()
    db.refresh(shelter)
    return shelter


@router.delete("/shelter/{pk}/", status_code=status.HTTP_204_NO_CONTENT)
def shelter_delete(
    pk: int,
    user: models.Account = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    shelter = _get_shelter_or_404(db, pk)
    if user.id != shelter.account_id:
        raise HTTPException(401, "You do not have permission to delete this shelter")
    db.delete(shelter.account)
    db.commit()


@router.get("/shelter/")
def shelter_list(
    request: Request, search: str | None = None, db: Session = Depends(get_db)
):
    stmt = select(models.Shelter).join(models.Account)
    if search:
        like = f"%{search}%"
        stmt = stmt.where(
            or_(
                models.Account.name.ilike(like),
                models.Shelter.city.ilike(like),
                models.Shelter.province.ilike(like),
            )
        )
    items = list(db.scalars(stmt).all())
    return paginate_serialized(items, schemas.ShelterOut, request)
