from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager

"""
The model for account.
email and password are used for authentication.
avatar for user to include a profile picture.
Each account is either assigned as a seeker or a shelter.
"""
class Account(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255, null=False, blank=False)
    avatar = models.ImageField(
        upload_to="avatars/", default="avatars/default-avatar.jpg"
    )
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    objects = CustomUserManager()

    def __str__(self):
        return self.name


"""
The model for seeker.
account is the django user that the seeker is associated with.
city and province provides the location of the seeker.
phone_number for additional contact information.
includes preference to generate notifications when a petlisting of interest is created.
"""
class Seeker(models.Model):
    account = models.OneToOneField(Account, on_delete=models.CASCADE)
    city = models.CharField(max_length=255, null=True, blank=True)
    province = models.CharField(max_length=255, null=True, blank=True)
    phone_number = models.PositiveIntegerField(null=True, blank=True)

    ANIMAL_CHOICES = [
        ("dog", "Dog"),
        ("cat", "Cat"),
        ("other", "Other"),
    ]

    AGE_CHOICES = [
        (1, "infant"),
        (2, "Young"),
        (3, "Adult"),
        (4, "Senior"),
    ]

    SIZE_CHOICES = [
        (1, "Small"),
        (2, "Medium"),
        (3, "Large"),
    ]

    SEX_CHOICES = [
        ("male", "Male"),
        ("female", "Female"),
    ]
    animal_preference = models.CharField(
        max_length=255, choices=ANIMAL_CHOICES, null=True, blank=True
    )
    breed_preference = models.CharField(max_length=255, null=True, blank=True)
    age_preference = models.IntegerField(
        choices=AGE_CHOICES, null=True, blank=True
    )
    sex_preference = models.CharField(
        max_length=255, choices=SEX_CHOICES, null=True, blank=True
    )
    size_preference = models.IntegerField(
        choices=SIZE_CHOICES, null=True, blank=True
    )
    open_to_special_needs_animals = models.BooleanField(
        null=False, blank=False, default=True
    )

    class Meta:
        verbose_name = "Seeker"
        verbose_name_plural = "Seekers"

    def __str__(self):
        return self.account.name

"""
The model for shelter.
account is the django user that the shelter is associated with.
address, city and province provides the location of the shelter.
phone_number for additional contact information.
description for additional information about the shelter such as mission statement.
"""
class Shelter(models.Model):
    account = models.OneToOneField(Account, on_delete=models.CASCADE)
    address = models.CharField(max_length=255, null=False, blank=False)
    city = models.CharField(max_length=255, null=False, blank=False)
    province = models.CharField(max_length=255, null=False, blank=False)
    phone_number = models.PositiveIntegerField(null=False, blank=False)
    description = models.CharField(max_length=500, null=False, blank=False)

    class Meta:
        verbose_name = "Shelter"
        verbose_name_plural = "Shelters"

    def __str__(self):
        return self.account.name
