"""Token endpoints, compatible with DRF SimpleJWT's TokenObtainPair/Refresh.

Mounted under ``/api`` to match the old ``api/urls.py``.
The frontend posts FormData (``email``, ``password``) to ``/api/token/``.
"""
from fastapi import APIRouter, Depends, Form, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from .. import models, schemas
from ..db import get_db
from ..security import (
    create_access_token,
    create_refresh_token,
    decode_token,
    verify_password,
)

router = APIRouter(prefix="/api", tags=["auth"])


@router.post("/token/", response_model=schemas.TokenPair)
def token_obtain_pair(
    email: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db),
):
    user = db.scalar(select(models.Account).where(models.Account.email == email))
    if user is None or not verify_password(password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No active account found with the given credentials",
        )
    return schemas.TokenPair(
        access=create_access_token(user.id),
        refresh=create_refresh_token(user.id),
    )


@router.post("/token/refresh/", response_model=schemas.TokenRefreshOut)
def token_refresh(body: schemas.TokenRefreshIn):
    payload = decode_token(body.refresh)
    if not payload or payload.get("token_type") != "refresh":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token is invalid or expired",
        )
    return schemas.TokenRefreshOut(access=create_access_token(payload["user_id"]))
