"""Pydantic schemas mirroring the old DRF serializers.

Field names, nesting and read/write split are kept identical so the existing
React frontend keeps working unchanged.
"""
from datetime import datetime

from pydantic import (
    BaseModel,
    ConfigDict,
    EmailStr,
    Field,
    field_validator,
    model_validator,
)

from .config import MEDIA_BASE_URL


class ORMModel(BaseModel):
    model_config = ConfigDict(from_attributes=True)


def _to_media_url(value):
    """Turn a stored relative media path into an absolute URL.

    Mirrors DRF's ImageField, which returned absolute URLs to the frontend.
    Leaves already-absolute URLs and empty values untouched.
    """
    if not value or str(value).startswith(("http://", "https://")):
        return value
    return MEDIA_BASE_URL + str(value).lstrip("/")


# --------------------------------------------------------------------------- #
# Accounts
# --------------------------------------------------------------------------- #
class AccountSignUp(BaseModel):
    email: EmailStr
    name: str
    password1: str
    password2: str

    @model_validator(mode="after")
    def check_passwords(self):
        if self.password1 and self.password2:
            if self.password1 != self.password2:
                raise ValueError("The two password fields didn't match")
            if len(self.password1) < 8:
                raise ValueError(
                    "This password is too short. It must contain at least 8 characters"
                )
        return self


class AccountOut(ORMModel):
    name: str
    email: EmailStr
    avatar: str
    date_joined: datetime

    _avatar_url = field_validator("avatar", mode="before")(_to_media_url)


class AccountUpdate(BaseModel):
    name: str | None = None
    avatar: str | None = None
    password1: str | None = None
    password2: str | None = None

    @model_validator(mode="after")
    def check_passwords(self):
        if self.password1:
            if self.password1 != self.password2:
                raise ValueError("The two password fields didn't match")
            if len(self.password1) < 8:
                raise ValueError(
                    "This password is too short. It must contain at least 8 characters"
                )
        return self


def _validate_phone(pn):
    if pn is not None and len(str(pn)) != 10:
        raise ValueError("Please enter a valid Canadian phone number.")
    return pn


class SeekerSignUp(BaseModel):
    account: AccountSignUp
    city: str | None = None
    province: str | None = None
    phone_number: int | None = None

    _phone = field_validator("phone_number")(_validate_phone)


class ShelterSignUp(BaseModel):
    account: AccountSignUp
    address: str
    city: str
    province: str
    phone_number: int
    description: str

    _phone = field_validator("phone_number")(_validate_phone)


class SeekerOut(ORMModel):
    account: AccountOut
    city: str | None = None
    province: str | None = None
    phone_number: int | None = None
    animal_preference: str | None = None
    breed_preference: str | None = None
    age_preference: int | None = None
    sex_preference: str | None = None
    size_preference: int | None = None
    open_to_special_needs_animals: bool


class ShelterOut(ORMModel):
    id: int
    account: AccountOut
    address: str
    city: str
    province: str
    phone_number: int
    description: str


class SeekerUpdate(BaseModel):
    account: AccountUpdate | None = None
    city: str | None = None
    province: str | None = None
    phone_number: int | None = None
    animal_preference: str | None = None
    breed_preference: str | None = None
    age_preference: int | None = None
    sex_preference: str | None = None
    size_preference: int | None = None
    open_to_special_needs_animals: bool | None = None

    _phone = field_validator("phone_number")(_validate_phone)


class ShelterUpdate(BaseModel):
    account: AccountUpdate | None = None
    address: str | None = None
    city: str | None = None
    province: str | None = None
    phone_number: int | None = None
    description: str | None = None

    _phone = field_validator("phone_number")(_validate_phone)


# --------------------------------------------------------------------------- #
# Pet / PetListing
# --------------------------------------------------------------------------- #
class PetBase(BaseModel):
    is_friendly: bool = False
    is_adventurous: bool = False
    is_extroverted: bool = False
    is_introverted: bool = False
    is_energetic: bool = False
    is_spn: bool = False
    is_vaccinated: bool = False
    animal_type: str
    name: str
    age: int
    sex: str
    size: int
    colour: str
    breed: str
    description: str
    special_needs: str | None = None
    weight: int
    image1: str | None = None
    image2: str | None = None
    image3: str | None = None


class PetOut(PetBase, ORMModel):
    id: int

    _img_urls = field_validator("image1", "image2", "image3", mode="before")(
        _to_media_url
    )


class PetListingCreate(BaseModel):
    status: str
    adoption_fee: int
    pet: PetBase


class PetListingUpdate(BaseModel):
    status: str | None = None
    adoption_fee: int | None = None
    pet: PetBase | None = None


class PetListingOut(ORMModel):
    id: int
    # DRF serialized the shelter FK as its id under the key "shelter".
    shelter: int = Field(validation_alias="shelter_id", serialization_alias="shelter")
    status: str
    pet: PetOut
    adoption_fee: int
    date_posted: datetime

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)


# --------------------------------------------------------------------------- #
# Applications
# --------------------------------------------------------------------------- #
class ApplicationCreate(BaseModel):
    residence_type: str
    fenced_yard: str
    pool: str
    current_pets: str
    address: str
    city: str
    postal_code: str
    phone_number: str
    other: str | None = None
    children: str
    children_under_13: str
    good_fit: str
    schedule: str
    insurance: str
    references: str
    vet: str
    questions: str | None = None


class ApplicationUpdate(BaseModel):
    status: str | None = None


class ApplicationOut(ORMModel):
    id: int
    seeker: SeekerOut | None = None
    petlisting: PetListingOut | None = None
    shelter: ShelterOut | None = None
    residence_type: str
    fenced_yard: str
    pool: str
    status: str
    current_pets: str
    address: str
    city: str
    postal_code: str
    phone_number: str
    other: str | None = None
    children: str
    children_under_13: str
    good_fit: str
    schedule: str
    insurance: str
    references: str
    vet: str
    questions: str | None = None
    create_time: datetime
    update_time: datetime


# --------------------------------------------------------------------------- #
# Blogs
# --------------------------------------------------------------------------- #
class BlogCreate(BaseModel):
    title: str
    content: str
    blog_type: str = "other"


class BlogOut(ORMModel):
    id: int
    title: str
    shelter: ShelterOut
    content: str
    timestamp: datetime
    blog_type: str


class BlogCreatedOut(ORMModel):
    """Mirrors BlogCreateSerializer: shelter rendered as its string repr."""

    id: int
    title: str
    shelter: str
    content: str
    timestamp: datetime
    blog_type: str

    @field_validator("shelter", mode="before")
    @classmethod
    def shelter_to_str(cls, v):
        return str(v) if not isinstance(v, str) else v


class BlogCommentCreate(BaseModel):
    content: str


class BlogCommentOut(ORMModel):
    blog: BlogOut
    owner: AccountOut
    content: str
    timestamp: datetime


# --------------------------------------------------------------------------- #
# Comments app: Review / Reply / Message
# --------------------------------------------------------------------------- #
class ReviewCreate(BaseModel):
    rating: int = 5
    content: str = ""


class ReviewOut(ORMModel):
    id: int
    owner: str
    shelter: str
    rating: int
    content: str
    timestamp: datetime
    hasReplies: bool

    @field_validator("owner", "shelter", mode="before")
    @classmethod
    def to_str(cls, v):
        return str(v) if not isinstance(v, str) else v


class ReplyCreate(BaseModel):
    content: str
    isSelf: bool = False


class ReplyOut(ORMModel):
    id: int
    owner: str
    content: str
    timestamp: datetime
    isSelf: bool

    @field_validator("owner", mode="before")
    @classmethod
    def to_str(cls, v):
        return str(v) if not isinstance(v, str) else v


class MessageCreate(BaseModel):
    content: str


class MessageOut(ORMModel):
    application_id: int | None = None
    owner: AccountOut
    content: str
    timestamp: datetime


# --------------------------------------------------------------------------- #
# Notifications
# --------------------------------------------------------------------------- #
class NotificationOut(ORMModel):
    id: int
    user_id: int
    url: str
    is_read: bool
    creation_time: datetime
    msg: str


# --------------------------------------------------------------------------- #
# Auth
# --------------------------------------------------------------------------- #
class TokenObtainPair(BaseModel):
    email: EmailStr
    password: str


class TokenPair(BaseModel):
    access: str
    refresh: str


class TokenRefreshIn(BaseModel):
    refresh: str


class TokenRefreshOut(BaseModel):
    access: str


class CurrentUserOut(BaseModel):
    id: int
    is_seeker: bool
