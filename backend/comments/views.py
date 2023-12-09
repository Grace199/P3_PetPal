from django.urls import reverse

from notification.models import Notification
from .serializers import (
    ReviewSerializer,
    MessageSerializer,
    ReplySerializer,
)
from rest_framework.generics import ListCreateAPIView, RetrieveAPIView
from .models import Review, Reply, Message
from django.shortcuts import get_object_or_404
from accounts.models import Shelter
from applications.models import Application
from rest_framework.exceptions import PermissionDenied


# Review -> List/Create
class ReviewListCreate(ListCreateAPIView):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        shelter = get_object_or_404(Shelter, id=self.kwargs["shelter_id"])
        queryset = Review.objects.filter(shelter=shelter).order_by("-timestamp")
        return queryset

    def perform_create(self, serializer):
        shelter = get_object_or_404(Shelter, id=self.kwargs["shelter_id"])
        serializer.save(owner=self.request.user, shelter=shelter)

        message_url = f"/comments/{serializer.instance.id}"

        notification = Notification(
            user=shelter.account, url=message_url, msg="New review!"
        )
        notification.save()
        return super().perform_create(serializer)


# Review -> Retrieve
class ReviewRetrieve(RetrieveAPIView):
    serializer_class = ReviewSerializer

    def get_object(self):
        review = get_object_or_404(Review, id=self.kwargs["review_id"])
        return review


# Message -> List/Create
class MessageListCreate(ListCreateAPIView):
    serializer_class = MessageSerializer

    def get_queryset(self):
        user = self.request.user
        application = get_object_or_404(Application, id=self.kwargs["application_id"])
        if application.seeker.account == user or application.shelter.account == user:
            queryset = Message.objects.filter(application=application).order_by(
                "-timestamp"
            )
            return queryset
        else:  # the user is not a seeker or shelter of the application chatroom it is trying to view
            raise PermissionDenied(
                detail="You do not have permission to access this chatroom", code=401
            )

    def perform_create(self, serializer):
        user = self.request.user
        application = get_object_or_404(Application, id=self.kwargs["application_id"])
        if application.seeker.account == user or application.shelter.account == user:
            serializer.save(owner=user, application=application)
            application.save()

            message_url = f"/comments/{serializer.instance.id}"

            if application.seeker.account == user:
                notification = Notification(
                    user=application.shelter.account,
                    url=message_url,
                    msg="New message from seeker!",
                )
            else:
                notification = Notification(
                    user=application.seeker.account,
                    url=message_url,
                    msg="New message from shelter!",
                )
            notification.save()
            return super().perform_create(serializer)
        else:  # the user is not a seeker or shelter of the application chatroom it is trying to talk in
            raise PermissionDenied(
                detail="You do not have permission to access in this chatroom", code=401
            )


# Message -> Retrieve
class MessageRetrieve(RetrieveAPIView):
    serializer_class = MessageSerializer

    def get_object(self):
        message = get_object_or_404(Message, id=self.kwargs["message_id"])
        application = message.application
        if (
            self.request.user == application.seeker.account
            or self.request.user == application.shelter.account
        ):
            return message
        else:
            raise PermissionDenied(
                detail="You do not have permission to view this message", code=401
            )


# Reply -> List/Create
class ReplyListCreate(ListCreateAPIView):
    serializer_class = ReplySerializer

    def get_queryset(self):
        review = get_object_or_404(Review, id=self.kwargs["review_id"])
        queryset = Reply.objects.filter(review=review).order_by("-timestamp")
        return queryset

    def perform_create(self, serializer):
        review = get_object_or_404(Review, id=self.kwargs["review_id"])
        review.hasReplies = True
        review.save()
        serializer.save(owner=self.request.user, review=review)

        message_url = f'/comments/{serializer.instance.id}'
        notification = Notification(
            user=review.shelter.account,
            url=message_url,
            msg="Someone replied to your review!",
        )
        notification.save()

        return super().perform_create(serializer)


# Reply -> Retrieve
class ReplyRetrieve(RetrieveAPIView):
    serializer_class = ReplySerializer

    def get_object(self):
        reply = get_object_or_404(Reply, id=self.kwargs["reply_id"])
        return reply
