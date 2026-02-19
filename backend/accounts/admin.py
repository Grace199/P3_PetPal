from django.contrib import admin
from .models import Account, Seeker, Shelter

# Register your models here.
admin.site.register(Account)
admin.site.register(Seeker)
admin.site.register(Shelter)