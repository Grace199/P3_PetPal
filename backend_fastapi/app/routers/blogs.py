"""Blogs router: blog list/create, blog detail, blog comments."""
from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import or_, select
from sqlalchemy.orm import Session

from .. import models, schemas
from ..db import get_db
from ..deps import get_current_user
from ..pagination import paginate_serialized

router = APIRouter(prefix="/blogs", tags=["blogs"])


@router.get("/")
def blog_list(
    request: Request,
    type: str | None = None,
    search: str | None = None,
    db: Session = Depends(get_db),
):
    stmt = select(models.Blog).join(models.Shelter).join(models.Account)
    if type:
        stmt = stmt.where(models.Blog.blog_type == type)
    if search:
        like = f"%{search}%"
        stmt = stmt.where(
            or_(models.Account.name.ilike(like), models.Blog.title.ilike(like))
        )
    items = list(db.scalars(stmt).all())
    return paginate_serialized(items, schemas.BlogOut, request)


@router.post("/", response_model=schemas.BlogCreatedOut, status_code=status.HTTP_201_CREATED)
def blog_create(
    payload: schemas.BlogCreate,
    user: models.Account = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if user.shelter is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Not found.")
    blog = models.Blog(
        shelter_id=user.shelter.id,
        title=payload.title,
        content=payload.content,
        blog_type=payload.blog_type,
    )
    db.add(blog)
    db.commit()
    db.refresh(blog)
    return blog


@router.get("/{blog_id}/", response_model=schemas.BlogOut)
def blog_retrieve(blog_id: int, db: Session = Depends(get_db)):
    blog = db.get(models.Blog, blog_id)
    if blog is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Not found.")
    return blog


@router.get("/{blog_id}/reply/")
def comment_list(blog_id: int, request: Request, db: Session = Depends(get_db)):
    if db.get(models.Blog, blog_id) is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Not found.")
    stmt = (
        select(models.BlogComment)
        .where(models.BlogComment.blog_id == blog_id)
        .order_by(models.BlogComment.timestamp)
    )
    items = list(db.scalars(stmt).all())
    return paginate_serialized(items, schemas.BlogCommentOut, request)


@router.post("/{blog_id}/reply/", response_model=schemas.BlogCommentOut, status_code=201)
def comment_create(
    blog_id: int,
    payload: schemas.BlogCommentCreate,
    user: models.Account = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if db.get(models.Blog, blog_id) is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Not found.")
    comment = models.BlogComment(
        blog_id=blog_id, owner_id=user.id, content=payload.content
    )
    db.add(comment)
    db.commit()
    db.refresh(comment)
    return comment
