"""Helper for the notification side-effects that the Django views created."""
from sqlalchemy.orm import Session

from . import models


def notify(db: Session, *, user_id: int, url: str, msg: str) -> models.Notification:
    notification = models.Notification(user_id=user_id, url=url, msg=msg)
    db.add(notification)
    db.commit()
    return notification
