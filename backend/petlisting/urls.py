from django.urls import path
from . import views

 
app_name = "petlisting"
urlpatterns = [
    path("", views.PetListingListCreate.as_view(), name="petlistings"),
    path("<int:pk>/", views.PetListingDetail.as_view(), name="petlisting_detail"),
]