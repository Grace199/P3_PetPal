from django.contrib import admin
from .models import Pet, PetListing

# Register your models here.

admin.site.register(Pet)
admin.site.register(PetListing)