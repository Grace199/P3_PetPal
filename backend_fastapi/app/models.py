"""SQLAlchemy models, a 1:1 port of the Django models.

Table names follow Django's ``<app>_<model>`` convention so the schema is
familiar, though we run against a fresh dev database.
"""
from datetime import datetime, timezone

from sqlalchemy import (
    Boolean,
    DateTime,
    ForeignKey,
    Integer,
    String,
    Text,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .config import DEFAULT_AVATAR
from .db import Base


def _utcnow() -> datetime:
    return datetime.now(timezone.utc)


class Account(Base):
    __tablename__ = "accounts_account"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(254), unique=True, nullable=False)
    name: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(128), nullable=False)
    avatar: Mapped[str] = mapped_column(String(255), default=DEFAULT_AVATAR)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    is_staff: Mapped[bool] = mapped_column(Boolean, default=False)
    is_superuser: Mapped[bool] = mapped_column(Boolean, default=False)
    date_joined: Mapped[datetime] = mapped_column(DateTime, default=_utcnow)

    seeker: Mapped["Seeker"] = relationship(back_populates="account", uselist=False)
    shelter: Mapped["Shelter"] = relationship(back_populates="account", uselist=False)

    def __str__(self) -> str:
        return self.name


class Seeker(Base):
    __tablename__ = "accounts_seeker"

    id: Mapped[int] = mapped_column(primary_key=True)
    account_id: Mapped[int] = mapped_column(
        ForeignKey("accounts_account.id", ondelete="CASCADE"), unique=True
    )
    city: Mapped[str | None] = mapped_column(String(255), nullable=True)
    province: Mapped[str | None] = mapped_column(String(255), nullable=True)
    phone_number: Mapped[int | None] = mapped_column(Integer, nullable=True)

    animal_preference: Mapped[str | None] = mapped_column(String(255), nullable=True)
    breed_preference: Mapped[str | None] = mapped_column(String(255), nullable=True)
    age_preference: Mapped[int | None] = mapped_column(Integer, nullable=True)
    sex_preference: Mapped[str | None] = mapped_column(String(255), nullable=True)
    size_preference: Mapped[int | None] = mapped_column(Integer, nullable=True)
    open_to_special_needs_animals: Mapped[bool] = mapped_column(Boolean, default=True)

    account: Mapped[Account] = relationship(back_populates="seeker")

    def __str__(self) -> str:
        return self.account.name


class Shelter(Base):
    __tablename__ = "accounts_shelter"

    id: Mapped[int] = mapped_column(primary_key=True)
    account_id: Mapped[int] = mapped_column(
        ForeignKey("accounts_account.id", ondelete="CASCADE"), unique=True
    )
    address: Mapped[str] = mapped_column(String(255), nullable=False)
    city: Mapped[str] = mapped_column(String(255), nullable=False)
    province: Mapped[str] = mapped_column(String(255), nullable=False)
    phone_number: Mapped[int] = mapped_column(Integer, nullable=False)
    description: Mapped[str] = mapped_column(String(500), nullable=False)

    account: Mapped[Account] = relationship(back_populates="shelter")

    def __str__(self) -> str:
        return self.account.name


class Pet(Base):
    __tablename__ = "petlisting_pet"

    id: Mapped[int] = mapped_column(primary_key=True)
    is_friendly: Mapped[bool] = mapped_column(Boolean, default=False)
    is_adventurous: Mapped[bool] = mapped_column(Boolean, default=False)
    is_extroverted: Mapped[bool] = mapped_column(Boolean, default=False)
    is_introverted: Mapped[bool] = mapped_column(Boolean, default=False)
    is_energetic: Mapped[bool] = mapped_column(Boolean, default=False)
    is_spn: Mapped[bool] = mapped_column(Boolean, default=False)
    is_vaccinated: Mapped[bool] = mapped_column(Boolean, default=False)
    animal_type: Mapped[str] = mapped_column(String(20), nullable=False)
    name: Mapped[str] = mapped_column(String(40), nullable=False)
    age: Mapped[int] = mapped_column(Integer, nullable=False)
    sex: Mapped[str] = mapped_column(String(20), nullable=False)
    size: Mapped[int] = mapped_column(Integer, nullable=False)
    colour: Mapped[str] = mapped_column(String(20), nullable=False)
    breed: Mapped[str] = mapped_column(String(100), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    special_needs: Mapped[str | None] = mapped_column(Text, nullable=True)
    weight: Mapped[int] = mapped_column(Integer, nullable=False)
    image1: Mapped[str] = mapped_column(String(255), default=DEFAULT_AVATAR)
    image2: Mapped[str] = mapped_column(String(255), default=DEFAULT_AVATAR)
    image3: Mapped[str] = mapped_column(String(255), default=DEFAULT_AVATAR)


class PetListing(Base):
    __tablename__ = "petlisting_petlisting"

    id: Mapped[int] = mapped_column(primary_key=True)
    date_posted: Mapped[datetime] = mapped_column(DateTime, default=_utcnow)
    shelter_id: Mapped[int] = mapped_column(
        ForeignKey("accounts_shelter.id", ondelete="CASCADE")
    )
    status: Mapped[str] = mapped_column(String(20))
    adoption_fee: Mapped[int] = mapped_column(Integer)
    pet_id: Mapped[int] = mapped_column(
        ForeignKey("petlisting_pet.id", ondelete="CASCADE"), unique=True
    )

    shelter: Mapped[Shelter] = relationship()
    pet: Mapped[Pet] = relationship()


class Application(Base):
    __tablename__ = "applications_application"

    id: Mapped[int] = mapped_column(primary_key=True)
    petlisting_id: Mapped[int] = mapped_column(
        ForeignKey("petlisting_petlisting.id", ondelete="CASCADE")
    )
    seeker_id: Mapped[int | None] = mapped_column(
        ForeignKey("accounts_seeker.id", ondelete="CASCADE"), nullable=True
    )
    shelter_id: Mapped[int | None] = mapped_column(
        ForeignKey("accounts_shelter.id", ondelete="SET NULL"), nullable=True
    )

    residence_type: Mapped[str] = mapped_column(String(20), nullable=False)
    fenced_yard: Mapped[str] = mapped_column(String(10), nullable=False)
    pool: Mapped[str] = mapped_column(String(10), nullable=False)
    status: Mapped[str] = mapped_column(String(20))

    current_pets: Mapped[str] = mapped_column(String(200), nullable=False)
    address: Mapped[str] = mapped_column(String(50), nullable=False)
    city: Mapped[str] = mapped_column(String(50), nullable=False)
    postal_code: Mapped[str] = mapped_column(String(20), nullable=False)
    phone_number: Mapped[str] = mapped_column(String(20), nullable=False)
    other: Mapped[str | None] = mapped_column(String(50), nullable=True)

    children: Mapped[str] = mapped_column(String(50), nullable=False)
    children_under_13: Mapped[str] = mapped_column(String(50), nullable=False)

    good_fit: Mapped[str] = mapped_column(Text, nullable=False)
    schedule: Mapped[str] = mapped_column(Text, nullable=False)
    insurance: Mapped[str] = mapped_column(Text, nullable=False)
    references: Mapped[str] = mapped_column(Text, nullable=False)
    vet: Mapped[str] = mapped_column(Text, nullable=False)
    questions: Mapped[str | None] = mapped_column(Text, nullable=True)

    create_time: Mapped[datetime] = mapped_column(DateTime, default=_utcnow)
    update_time: Mapped[datetime] = mapped_column(
        DateTime, default=_utcnow, onupdate=_utcnow
    )

    petlisting: Mapped[PetListing] = relationship()
    seeker: Mapped[Seeker | None] = relationship()
    shelter: Mapped[Shelter | None] = relationship()


class Blog(Base):
    __tablename__ = "blogs_blog"

    id: Mapped[int] = mapped_column(primary_key=True)
    shelter_id: Mapped[int] = mapped_column(
        ForeignKey("accounts_shelter.id", ondelete="CASCADE")
    )
    title: Mapped[str] = mapped_column(String(125), nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    timestamp: Mapped[datetime] = mapped_column(DateTime, default=_utcnow)
    blog_type: Mapped[str] = mapped_column(String(50), default="other")

    shelter: Mapped[Shelter] = relationship()

    def __str__(self) -> str:
        return self.title


class BlogComment(Base):
    """Django ``blogs.Comment`` (separate from the ``comments`` app)."""

    __tablename__ = "blogs_comment"

    id: Mapped[int] = mapped_column(primary_key=True)
    blog_id: Mapped[int] = mapped_column(
        ForeignKey("blogs_blog.id", ondelete="CASCADE")
    )
    owner_id: Mapped[int] = mapped_column(
        ForeignKey("accounts_account.id", ondelete="CASCADE")
    )
    content: Mapped[str] = mapped_column(String(250), nullable=False)
    timestamp: Mapped[datetime] = mapped_column(DateTime, default=_utcnow)

    blog: Mapped[Blog] = relationship()
    owner: Mapped[Account] = relationship()


class Review(Base):
    __tablename__ = "comments_review"

    id: Mapped[int] = mapped_column(primary_key=True)
    owner_id: Mapped[int] = mapped_column(
        ForeignKey("accounts_account.id", ondelete="CASCADE")
    )
    shelter_id: Mapped[int] = mapped_column(
        ForeignKey("accounts_shelter.id", ondelete="CASCADE")
    )
    rating: Mapped[int] = mapped_column(Integer, default=5)
    content: Mapped[str] = mapped_column(String(500), default="")
    timestamp: Mapped[datetime] = mapped_column(DateTime, default=_utcnow)
    hasReplies: Mapped[bool] = mapped_column(Boolean, default=False)

    owner: Mapped[Account] = relationship()
    shelter: Mapped[Shelter] = relationship()


class Reply(Base):
    __tablename__ = "comments_reply"

    id: Mapped[int] = mapped_column(primary_key=True)
    owner_id: Mapped[int] = mapped_column(
        ForeignKey("accounts_account.id", ondelete="CASCADE")
    )
    review_id: Mapped[int] = mapped_column(
        ForeignKey("comments_review.id", ondelete="CASCADE")
    )
    content: Mapped[str] = mapped_column(String(500), nullable=False)
    timestamp: Mapped[datetime] = mapped_column(DateTime, default=_utcnow)
    isSelf: Mapped[bool] = mapped_column(Boolean, default=False)

    owner: Mapped[Account] = relationship()
    review: Mapped[Review] = relationship()


class Message(Base):
    __tablename__ = "comments_message"

    id: Mapped[int] = mapped_column(primary_key=True)
    application_id: Mapped[int | None] = mapped_column(
        ForeignKey("applications_application.id", ondelete="SET NULL"), nullable=True
    )
    owner_id: Mapped[int] = mapped_column(
        ForeignKey("accounts_account.id", ondelete="CASCADE")
    )
    content: Mapped[str] = mapped_column(String(500), nullable=False)
    timestamp: Mapped[datetime] = mapped_column(DateTime, default=_utcnow)

    application: Mapped[Application | None] = relationship()
    owner: Mapped[Account] = relationship()


class Notification(Base):
    __tablename__ = "notification_notification"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(
        ForeignKey("accounts_account.id", ondelete="CASCADE")
    )
    url: Mapped[str] = mapped_column(String(200))
    is_read: Mapped[bool] = mapped_column(Boolean, default=False)
    creation_time: Mapped[datetime] = mapped_column(DateTime, default=_utcnow)
    msg: Mapped[str] = mapped_column(String(200))

    user: Mapped[Account] = relationship()
