"""Notification router: list, retrieve (marks read)/delete, unread count."""
from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from .. import models, schemas
from ..db import get_db
from ..deps import get_current_user
from ..pagination import paginate_serialized

router = APIRouter(prefix="/notification", tags=["notification"])


@router.get("/")
def notification_list(
    request: Request,
    sort: str = "newest",
    is_read: str = "false",
    user: models.Account = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    stmt = select(models.Notification).where(models.Notification.user_id == user.id)
    is_read_value = is_read == "true"
    stmt = stmt.where(models.Notification.is_read == is_read_value)
    if sort == "newest":
        stmt = stmt.order_by(models.Notification.creation_time.desc())
    elif sort == "oldest":
        stmt = stmt.order_by(models.Notification.creation_time.asc())
    items = list(db.scalars(stmt).all())
    return paginate_serialized(items, schemas.NotificationOut, request)


@router.get("/unread/")
def unread_count(
    user: models.Account = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    count = db.scalar(
        select(func.count(models.Notification.id)).where(
            models.Notification.user_id == user.id,
            models.Notification.is_read == False,  # noqa: E712
        )
    )
    return {"unread_count": count or 0}


@router.get("/{pk}/", response_model=schemas.NotificationOut)
def notification_retrieve(
    pk: int,
    user: models.Account = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    notification = db.get(models.Notification, pk)
    if notification is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Not found.")
    if notification.user_id != user.id:
        raise HTTPException(401, "You do not have permission to access this notification.")
    notification.is_read = True
    db.commit()
    db.refresh(notification)
    return notification


@router.delete("/{pk}/", status_code=status.HTTP_204_NO_CONTENT)
def notification_delete(
    pk: int,
    user: models.Account = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    notification = db.get(models.Notification, pk)
    if notification is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Not found.")
    if notification.user_id != user.id:
        raise HTTPException(401, "You do not have permission to delete this notification.")
    db.delete(notification)
    db.commit()
