from django.urls import path
from . import views

 
app_name = "accounts"
urlpatterns = [
    path("seeker/signup/", views.SeekerCreate.as_view(), name="seeker_signup"),
    path("shelter/signup/", views.ShelterCreate.as_view(), name="shelter_signup"),
    path("seeker/<int:pk>/", views.SeekerRetrieveUpdateDestroy.as_view(), name="seeker_profile"),
    path("shelter/<int:pk>/", views.ShelterRetrieveUpdateDestroy.as_view(), name="shelter_profile"),
    path("shelter/", views.ShelterList.as_view(), name="shelters"),
]