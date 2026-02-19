from django.urls import path
from .views import NotificationsUpdate, NotificationsListView

app_name = "notification"
urlpatterns=[
    path("<int:pk>/", NotificationsUpdate.as_view(), name="notif_update"),
    path("", NotificationsListView.as_view(), name="notif_list"),
]