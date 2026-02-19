from django.contrib import admin
from .models import Review, Reply, Message

# Register your models here.
admin.site.register(Review)
admin.site.register(Reply)
admin.site.register(Message)
