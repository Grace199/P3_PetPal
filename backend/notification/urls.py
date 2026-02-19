from django.urls import path
from .views import (
    NotificationsUpdate,
    NotificationsListView,
    UnreadNotificationsCountView,
)

app_name = "notification"
urlpatterns = [
    path("<int:pk>/", NotificationsUpdate.as_view(), name="notif_update"),
    path("unread/", UnreadNotificationsCountView.as_view(), name="unread_count"),
    path("", NotificationsListView.as_view(), name="notif_list"),
]
