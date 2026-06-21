"""Comments router: reviews, replies, and chatroom messages."""
from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from .. import models, schemas
from ..db import get_db
from ..deps import get_current_user
from ..notifications import notify
from ..pagination import paginate_serialized

router = APIRouter(prefix="/comments", tags=["comments"])


# --------------------------------------------------------------------------- #
# Reviews
# --------------------------------------------------------------------------- #
@router.get("/shelter/{shelter_id}/review/")
def review_list(shelter_id: int, request: Request, db: Session = Depends(get_db)):
    if db.get(models.Shelter, shelter_id) is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Not found.")
    stmt = (
        select(models.Review)
        .where(models.Review.shelter_id == shelter_id)
        .order_by(models.Review.timestamp.desc())
    )
    items = list(db.scalars(stmt).all())
    return paginate_serialized(items, schemas.ReviewOut, request)


@router.post("/shelter/{shelter_id}/review/", response_model=schemas.ReviewOut, status_code=201)
def review_create(
    shelter_id: int,
    payload: schemas.ReviewCreate,
    user: models.Account = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    shelter = db.get(models.Shelter, shelter_id)
    if shelter is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Not found.")
    review = models.Review(
        owner_id=user.id,
        shelter_id=shelter_id,
        rating=payload.rating,
        content=payload.content,
    )
    db.add(review)
    db.flush()
    notify(db, user_id=shelter.account_id, url=f"/comments/{review.id}", msg="New review!")
    db.refresh(review)
    return review


@router.get("/review/{review_id}/", response_model=schemas.ReviewOut)
def review_retrieve(review_id: int, db: Session = Depends(get_db)):
    review = db.get(models.Review, review_id)
    if review is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Not found.")
    return review


# --------------------------------------------------------------------------- #
# Replies
# --------------------------------------------------------------------------- #
@router.get("/review/{review_id}/reply/")
def reply_list(review_id: int, request: Request, db: Session = Depends(get_db)):
    if db.get(models.Review, review_id) is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Not found.")
    stmt = (
        select(models.Reply)
        .where(models.Reply.review_id == review_id)
        .order_by(models.Reply.timestamp.desc())
    )
    items = list(db.scalars(stmt).all())
    return paginate_serialized(items, schemas.ReplyOut, request)


@router.post("/review/{review_id}/reply/", response_model=schemas.ReplyOut, status_code=201)
def reply_create(
    review_id: int,
    payload: schemas.ReplyCreate,
    user: models.Account = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    review = db.get(models.Review, review_id)
    if review is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Not found.")
    review.hasReplies = True
    reply = models.Reply(
        owner_id=user.id,
        review_id=review_id,
        content=payload.content,
        isSelf=payload.isSelf,
    )
    db.add(reply)
    db.flush()
    notify(
        db,
        user_id=review.shelter.account_id,
        url=f"/shelterDetail/{review.shelter_id}/",
        msg="Someone replied to your review!",
    )
    db.refresh(reply)
    return reply


@router.get("/review/reply/{reply_id}/", response_model=schemas.ReplyOut)
def reply_retrieve(reply_id: int, db: Session = Depends(get_db)):
    reply = db.get(models.Reply, reply_id)
    if reply is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Not found.")
    return reply


# --------------------------------------------------------------------------- #
# Messages (chatroom)
# --------------------------------------------------------------------------- #
def _require_participant(application: models.Application, user: models.Account):
    seeker_acc = application.seeker.account_id if application.seeker else None
    shelter_acc = application.shelter.account_id if application.shelter else None
    if user.id not in (seeker_acc, shelter_acc):
        raise HTTPException(401, "You do not have permission to access this chatroom")


@router.get("/chatroom/{application_id}/chat/")
def message_list(
    application_id: int,
    request: Request,
    user: models.Account = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    application = db.get(models.Application, application_id)
    if application is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Not found.")
    _require_participant(application, user)
    stmt = (
        select(models.Message)
        .where(models.Message.application_id == application_id)
        .order_by(models.Message.timestamp)
    )
    items = list(db.scalars(stmt).all())
    return paginate_serialized(items, schemas.MessageOut, request)


@router.post("/chatroom/{application_id}/chat/", response_model=schemas.MessageOut, status_code=201)
def message_create(
    application_id: int,
    payload: schemas.MessageCreate,
    user: models.Account = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    application = db.get(models.Application, application_id)
    if application is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Not found.")
    _require_participant(application, user)
    message = models.Message(
        owner_id=user.id, application_id=application_id, content=payload.content
    )
    db.add(message)
    db.flush()
    if application.seeker and application.seeker.account_id == user.id:
        notify(db, user_id=application.shelter.account_id, url="/chatroom/",
               msg="New message from seeker!")
    else:
        notify(db, user_id=application.seeker.account_id, url="/chatroom/",
               msg="New message from shelter!")
    db.refresh(message)
    return message


@router.get("/chatroom/chat/{message_id}/", response_model=schemas.MessageOut)
def message_retrieve(
    message_id: int,
    user: models.Account = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    message = db.get(models.Message, message_id)
    if message is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Not found.")
    _require_participant(message.application, user)
    return message
