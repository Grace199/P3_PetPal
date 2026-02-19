from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import BaseValidator
from accounts.models import Seeker, Shelter
from petlisting.models import PetListing


# Create your models here.


class Application(models.Model):
    YES_NO_CHOICES = [
        ("yes", "Yes"),
        ("no", "No"),
    ]

    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("accepted", "Accepted"),
        ("denied", "Denied"),
        ("withdrawn", "Withdrawn"),
    ]

    RESIDENCE_CHOICES = [
        ("apartment", "Apartment"),
        ("condominium", "Condominium"),
        ("townhouse", "Townhouse"),
        ("house", "House"),
        ("other", "Other"),
    ]

    petlisting = models.ForeignKey(PetListing, on_delete=models.CASCADE) # application only deleted if listing deleted
    seeker = models.ForeignKey(Seeker, null=True, blank=False, on_delete=models.CASCADE)
    shelter = models.ForeignKey(Shelter, null=True, blank=False, on_delete=models.SET_NULL)

    residence_type = models.CharField(max_length=20, choices=RESIDENCE_CHOICES, null=False, blank=False)
    fenced_yard = models.CharField(max_length=10, choices=YES_NO_CHOICES, null=False, blank=False)
    pool = models.CharField(max_length=10, choices=YES_NO_CHOICES, null=False, blank=False)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)

    current_pets = models.CharField(max_length=200, null=False, blank=False)
    #pet_ages = models.CharField(max_length=200, null=True, blank=True) # REMOVED
    address = models.CharField(max_length=50, null=False, blank=False)
    city = models.CharField(max_length=50, null=False, blank=False)
    postal_code = models.CharField(max_length=20, null=False, blank=False)
    phone_number = models.CharField(max_length=20, null=False, blank=False)
    other = models.CharField(max_length=50, null=True, blank=True)

    children = models.CharField(max_length=50, null=False, blank=False) # CHANGED FROM POSITIVE INT TO CHARFIELD
    children_under_13 = models.CharField(max_length=50, null=False, blank=False) # CHANGED FROM POSITIVE INT TO CHARFIELD

    good_fit = models.TextField(null=False, blank=False)
    schedule = models.TextField(null=False, blank=False)
    insurance = models.TextField(null=False, blank=False)
    references = models.TextField(null=False, blank=False)
    vet = models.TextField(null=False, blank=False)
    questions = models.TextField(null=True, blank=True)

    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)
