from rest_framework.serializers import (
    ModelSerializer,
    StringRelatedField,
)
from .models import Blog, Comment
from accounts.serializers import AccountSerializer, ShelterSerializer


class BlogSerializer(ModelSerializer):
    shelter = ShelterSerializer()

    class Meta:
        model = Blog
        fields = [
            "id",
            "title",
            "shelter",
            "content",
            "timestamp",
            "blog_type",
        ]


class BlogCreateSerializer(ModelSerializer):
    shelter = StringRelatedField(many=False)

    class Meta:
        model = Blog
        fields = [
            "id",
            "title",
            "shelter",
            "content",
            "timestamp",
            "blog_type",
        ]


class CommentSerializer(ModelSerializer):
    blog = BlogSerializer()
    owner = AccountSerializer()

    class Meta:
        model = Comment
        fields = [
            "blog",
            "owner",
            "content",
            "timestamp",
        ]


class CommentCreateSerializer(ModelSerializer):
    blog = StringRelatedField(many=False)
    owner = StringRelatedField(many=False)

    class Meta:
        model = Comment
        fields = [
            "blog",
            "owner",
            "content",
            "timestamp",
        ]
