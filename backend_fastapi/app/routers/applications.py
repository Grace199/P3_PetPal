"""Applications router."""
from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from .. import models, schemas
from ..db import get_db
from ..deps import get_current_seeker, get_current_shelter, get_current_user
from ..notifications import notify
from ..pagination import paginate_serialized

router = APIRouter(prefix="/applications", tags=["applications"])

_VALID_STATUS = {"pending", "accepted", "denied", "withdrawn"}
_VALID_SORT = {"create_time", "-create_time", "update_time", "-update_time"}


def _get_application_or_404(db: Session, pk: int) -> models.Application:
    application = db.get(models.Application, pk)
    if application is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Not found.")
    return application


# --------------------------------------------------------------------------- #
# Seeker creates an application for a petlisting
# --------------------------------------------------------------------------- #
@router.post(
    "/seeker/application/{pk}/",
    response_model=schemas.ApplicationOut,
    status_code=status.HTTP_201_CREATED,
)
def seeker_application_create(
    pk: int,
    payload: schemas.ApplicationCreate,
    user: models.Account = Depends(get_current_seeker),
    db: Session = Depends(get_db),
):
    listing = db.get(models.PetListing, pk)
    if listing is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Not found.")
    if listing.status != "AVAILABLE":
        raise HTTPException(401, "Cannot apply for PetListing which is not available")

    application = models.Application(
        petlisting_id=listing.id,
        shelter_id=listing.shelter_id,
        seeker_id=user.seeker.id,
        status="pending",
        **payload.model_dump(),
    )
    db.add(application)
    db.flush()
    notify(
        db,
        user_id=listing.shelter.account_id,
        url=f"/applications/{application.id}",
        msg="Check out your new application!",
    )
    db.refresh(application)
    return application


# --------------------------------------------------------------------------- #
# Retrieve / update (seeker)
# --------------------------------------------------------------------------- #
@router.get("/seeker/{pk:int}/", response_model=schemas.ApplicationOut)
def seeker_application_retrieve(
    pk: int,
    user: models.Account = Depends(get_current_seeker),
    db: Session = Depends(get_db),
):
    application = _get_application_or_404(db, pk)
    if application.seeker_id != user.seeker.id:
        raise HTTPException(401, "Application does not belong to seeker")
    return application


@router.patch("/seeker/{pk:int}/", response_model=schemas.ApplicationOut)
@router.put("/seeker/{pk:int}/", response_model=schemas.ApplicationOut)
def seeker_application_update(
    pk: int,
    payload: schemas.ApplicationUpdate,
    user: models.Account = Depends(get_current_seeker),
    db: Session = Depends(get_db),
):
    application = _get_application_or_404(db, pk)
    if application.seeker_id != user.seeker.id:
        raise HTTPException(401, "Application does not belong to seeker")
    if application.status not in ("pending", "accepted"):
        raise HTTPException(401, "Application cannot be updated in its current state")
    if payload.status is None:
        raise HTTPException(
            401, "Only the status of an application can be updated once submitted"
        )
    if payload.status != "withdrawn":
        raise HTTPException(401, 'Status can only be changed to "withdrawn')
    application.status = "withdrawn"
    db.commit()
    db.refresh(application)
    return application


# --------------------------------------------------------------------------- #
# Retrieve / update (shelter)
# --------------------------------------------------------------------------- #
@router.get("/shelter/{pk:int}/", response_model=schemas.ApplicationOut)
def shelter_application_retrieve(
    pk: int,
    user: models.Account = Depends(get_current_shelter),
    db: Session = Depends(get_db),
):
    application = _get_application_or_404(db, pk)
    if application.shelter_id != user.shelter.id:
        raise HTTPException(401, "Application does not belong to shelter")
    return application


@router.patch("/shelter/{pk:int}/", response_model=schemas.ApplicationOut)
@router.put("/shelter/{pk:int}/", response_model=schemas.ApplicationOut)
def shelter_application_update(
    pk: int,
    payload: schemas.ApplicationUpdate,
    user: models.Account = Depends(get_current_shelter),
    db: Session = Depends(get_db),
):
    application = _get_application_or_404(db, pk)
    if application.shelter_id != user.shelter.id:
        raise HTTPException(401, "Application does not belong to shelter")
    if application.status != "pending":
        raise HTTPException(401, "Application cannot be updated in its current state")
    if payload.status is None:
        raise HTTPException(
            401, "Only the status of an application can be updated once submitted"
        )
    if payload.status not in ("accepted", "denied"):
        raise HTTPException(401, 'Status can only be changed to "denied" or "accepted"')
    application.status = payload.status
    db.flush()
    notify(
        db,
        user_id=application.seeker.account_id,
        url=f"/applications/{application.id}",
        msg="Your application status has changed.",
    )
    db.refresh(application)
    return application


# --------------------------------------------------------------------------- #
# Lists
# --------------------------------------------------------------------------- #
def _filter_and_sort(stmt, request: Request):
    status_filters = request.query_params.get("status")
    sorts = request.query_params.get("sort")
    if status_filters:
        values = status_filters.split(",")
        if any(v not in _VALID_STATUS for v in values):
            raise HTTPException(401, "Invalid status parameter")
        stmt = stmt.where(models.Application.status.in_(values))
    if sorts:
        for s in sorts.split(","):
            if s not in _VALID_SORT:
                raise HTTPException(401, "Invalid sort parameter")
            col = getattr(models.Application, s.lstrip("-"))
            stmt = stmt.order_by(col.desc() if s.startswith("-") else col.asc())
    return stmt


@router.get("/shelter/list/")
def shelter_application_list(
    request: Request,
    user: models.Account = Depends(get_current_shelter),
    db: Session = Depends(get_db),
):
    stmt = select(models.Application).where(
        models.Application.shelter_id == user.shelter.id
    )
    items = list(db.scalars(_filter_and_sort(stmt, request)).all())
    return paginate_serialized(items, schemas.ApplicationOut, request)


@router.get("/seeker/list/")
def seeker_application_list(
    request: Request,
    user: models.Account = Depends(get_current_seeker),
    db: Session = Depends(get_db),
):
    stmt = select(models.Application).where(
        models.Application.seeker_id == user.seeker.id
    )
    items = list(db.scalars(_filter_and_sort(stmt, request)).all())
    return paginate_serialized(items, schemas.ApplicationOut, request)


@router.get("/list/")
def application_list(
    request: Request,
    user: models.Account = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if user.seeker is not None:
        stmt = select(models.Application).where(
            models.Application.seeker_id == user.seeker.id
        )
    elif user.shelter is not None:
        stmt = select(models.Application).where(
            models.Application.shelter_id == user.shelter.id
        )
    else:
        return paginate_serialized([], schemas.ApplicationOut, request)
    items = list(db.scalars(stmt).all())
    return paginate_serialized(items, schemas.ApplicationOut, request)
