from django.db import models
from accounts.models import Shelter

class Pet(models.Model):

    ANIMAL_CHOICES = [
        ("dog", "Dog"),
        ("cat", "Cat"),
        ("other", "Other"),
    ]

    AGE_CHOICES = [
        (1, "Infant"),
        (2, "Young"),
        (3, "Adult"),
        (4, "Senior"),
    ]

    SEX_CHOICES = [
        ("male", "Male"),
        ("female", "Female"),
    ]

    SIZE_CHOICES = [
        (1, "Small"),
        (2, "Medium"),
        (3, "Large"),
    ]

    COLOUR_CHOICES = [
        ("black", "Black"),
        ("white", "White"),
        ("golden", "Golden"),
    ]

    is_friendly = models.BooleanField(default=False)
    is_adventurous = models.BooleanField(default=False)
    is_extroverted = models.BooleanField(default=False)
    is_introverted = models.BooleanField(default=False)
    is_energetic = models.BooleanField(default=False)
    is_spn = models.BooleanField(default=False)
    is_vaccinated = models.BooleanField(default=False)
    animal_type = models.CharField(max_length=20, choices=ANIMAL_CHOICES, blank=False, null=False)
    name = models.CharField(max_length=40, null=False, blank=False)
    age = models.IntegerField(choices=AGE_CHOICES, null=False, blank=False)
    sex = models.CharField(max_length=20, choices=SEX_CHOICES, null=False, blank=False)
    size = models.IntegerField(choices=SIZE_CHOICES, null=False, blank=False)
    colour = models.CharField(max_length=20, choices=COLOUR_CHOICES, null=False, blank=False)
    breed = models.CharField(max_length=100, null=False, blank=False)
    description = models.TextField(null=False, blank=False)
    special_needs = models.TextField(null=True, blank=True)
    weight = models.PositiveIntegerField(null=False, blank=False)

    image1 = models.ImageField(upload_to="avatars/", default="avatars/default-avatar.jpg", null=False, blank=True)
    image2 = models.ImageField(upload_to="avatars/", default="avatars/default-avatar.jpg", null=False, blank=True)
    image3 = models.ImageField(upload_to="avatars/", default="avatars/default-avatar.jpg", null=False, blank=True)


class PetListing(models.Model):

    STATUS_CHOICES = [
        ("AVAILABLE", 'Available'),
        ("WITHDRAWN", 'Withdrawn'),
        ("ADOPTED", "Adopted"),
    ]

    date_posted = models.DateTimeField(auto_now_add=True)
    shelter = models.ForeignKey(Shelter, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    adoption_fee = models.PositiveIntegerField()
    pet = models.OneToOneField(Pet, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.pet.name}'s listing"