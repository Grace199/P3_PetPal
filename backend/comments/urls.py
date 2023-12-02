from django.urls import path
from .views import (
    ReviewListCreate,
    MessageListCreate,
    ReplyListCreate,
    ReviewRetrieve,
    ReplyRetrieve,
    MessageRetrieve,
)

app_name = "comments"
urlpatterns = [
    path(
        "shelter/<int:shelter_id>/review/",
        ReviewListCreate.as_view(),
        name="review_list",
    ),
    path(
        "review/<int:review_id>/",
        ReviewRetrieve.as_view(),
        name="review",
    ),
    path(
        "chatroom/<int:application_id>/chat/",
        MessageListCreate.as_view(),
        name="message_list",
    ),
    path(
        "chatroom/chat/<int:message_id>/",
        MessageRetrieve.as_view(),
        name="message",
    ),
    path("review/<int:review_id>/reply/", ReplyListCreate.as_view(), name="reply_list"),
    path(
        "review/reply/<int:reply_id>/",
        ReplyRetrieve.as_view(),
        name="reply",
    ),
]
