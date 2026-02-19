from django.shortcuts import get_object_or_404
from rest_framework.serializers import (
    ModelSerializer,
    CharField,
    DateTimeField,
    PrimaryKeyRelatedField,
    StringRelatedField,
)
from .models import Review, Reply, Message
from accounts.models import Account, Shelter
from accounts.serializers import AccountSerializer


class ReviewSerializer(ModelSerializer):
    owner = StringRelatedField(many=False)
    shelter = StringRelatedField(many=False)
    timestamp = DateTimeField(read_only=True)

    class Meta:
        model = Review
        fields = [
            "id",
            "owner",
            "shelter",
            "rating",
            "content",
            "timestamp",
            "hasReplies",
        ]


class MessageSerializer(ModelSerializer):
    owner = AccountSerializer()
    timestamp = DateTimeField(read_only=True)

    class Meta:
        model = Message
        fields = [
            "application",
            "owner",
            "content",
            "timestamp",
        ]


class MessageCreateSerializer(ModelSerializer):
    owner = StringRelatedField(many=False)
    timestamp = DateTimeField(read_only=True)

    class Meta:
        model = Message
        fields = [
            "owner",
            "content",
            "timestamp",
        ]


class ReplySerializer(ModelSerializer):
    owner = StringRelatedField(many=False)
    timestamp = DateTimeField(read_only=True)

    class Meta:
        model = Reply
        fields = [
            "id",
            "owner",
            "content",
            "timestamp",
            "isSelf",
        ]
