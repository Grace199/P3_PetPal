"""Current-user router: report the logged-in user's id and seeker/shelter role."""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from .. import models, schemas
from ..db import get_db
from ..deps import get_current_user

router = APIRouter(prefix="/currentuser", tags=["currentuser"])


@router.get("/", response_model=schemas.CurrentUserOut)
def current_user_detail(
    user: models.Account = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if user.seeker is not None:
        return schemas.CurrentUserOut(id=user.seeker.id, is_seeker=True)
    if user.shelter is not None:
        return schemas.CurrentUserOut(id=user.shelter.id, is_seeker=False)
    raise HTTPException(status.HTTP_401_UNAUTHORIZED)
