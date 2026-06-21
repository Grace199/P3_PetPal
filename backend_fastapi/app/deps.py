"""Auth dependencies: resolve the current user and role guards.

Reads a SimpleJWT-compatible ``Authorization: Bearer <access>`` header, as
sent by the existing frontend (see frontend/src/util/ajax.js).
"""
from fastapi import Depends, Header, HTTPException, status
from sqlalchemy.orm import Session

from . import models
from .db import get_db
from .security import decode_token

_CREDENTIALS_EXC = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Authentication credentials were not provided.",
    headers={"WWW-Authenticate": "Bearer"},
)


def get_current_user(
    authorization: str | None = Header(default=None),
    db: Session = Depends(get_db),
) -> models.Account:
    if not authorization or not authorization.startswith("Bearer "):
        raise _CREDENTIALS_EXC

    token = authorization.split(" ", 1)[1]
    payload = decode_token(token)
    if not payload or payload.get("token_type") != "access":
        raise _CREDENTIALS_EXC

    user_id = payload.get("user_id")
    user = db.get(models.Account, user_id) if user_id is not None else None
    if user is None:
        raise _CREDENTIALS_EXC
    return user


def get_current_seeker(
    user: models.Account = Depends(get_current_user),
) -> models.Account:
    if user.seeker is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to perform this action.",
        )
    return user


def get_current_shelter(
    user: models.Account = Depends(get_current_user),
) -> models.Account:
    if user.shelter is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to perform this action.",
        )
    return user
