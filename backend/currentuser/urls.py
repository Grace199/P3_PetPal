from django.urls import path
from . import views
from accounts.models import Shelter

app_name = "currentuser"
urlpatterns = [
    path("", views.CurrentUserDetail.as_view(), name="current_user_detail"),
]
