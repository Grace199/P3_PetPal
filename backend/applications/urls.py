from django.urls import path
from . import views

 
app_name = "applications"
urlpatterns = [
    path("seeker/application/<int:pk>/", views.SeekerApplicationCreate.as_view(), name="seeker_application_create"),
    path("seeker/<int:pk>/", views.SeekerApplicationUpdate.as_view(), name="seeker_application_update"),
    path("shelter/<int:pk>/", views.ShelterApplicationUpdate.as_view(), name="shelter_application_update"),
    path("shelter/list/", views.ShelterApplicationList.as_view(), name="shelter_applications_list"),
    path("seeker/list/", views.SeekerApplicationList.as_view(), name="seeker_applications_list"),
]