from django.shortcuts import render
from .serializers import (
    BlogSerializer,
    CommentSerializer,
    BlogCreateSerializer,
    CommentCreateSerializer,
)
from rest_framework.generics import ListCreateAPIView, RetrieveAPIView
from .models import Blog, Comment
from django.shortcuts import get_object_or_404
from accounts.models import Account, Shelter
from rest_framework.exceptions import PermissionDenied


# Create your views here.
class BlogListCreate(ListCreateAPIView):
    def get_serializer_class(self):
        if self.request.method == "POST":
            return BlogCreateSerializer
        else:
            return BlogSerializer

    def get_queryset(self):
        queryset = Blog.objects.all()
        type = self.request.query_params.get("type", None)
        search_query = self.request.query_params.get("search", None)
        search_fields = [
            "shelter__account__name",
            "title",
        ]

        if type:
            queryset = queryset.filter(blog_type=type)
        if search_query:
            if queryset is not None:
                queryset = queryset.filter(
                    shelter__account__name__icontains=search_query
                ) | queryset.filter(title__icontains=search_query)

        return queryset

    def perform_create(self, serializer):
        account = self.request.user
        shelter = get_object_or_404(Shelter, account=account)
        serializer.save(shelter=shelter)
        return super().perform_create(serializer)


class BlogRetrieve(RetrieveAPIView):
    serializer_class = BlogSerializer

    def get_object(self):
        blog = get_object_or_404(Blog, id=self.kwargs["blog_id"])
        return blog


class CommentListCreate(ListCreateAPIView):
    def get_serializer_class(self):
        if self.request.method == "POST":
            return CommentCreateSerializer
        else:
            return CommentSerializer

    def get_queryset(self):
        blog = get_object_or_404(Blog, id=self.kwargs["blog_id"])
        queryset = Comment.objects.filter(blog=blog).order_by("timestamp")
        return queryset

    def perform_create(self, serializer):
        blog = get_object_or_404(Blog, id=self.kwargs["blog_id"])
        owner = self.request.user
        serializer.save(blog=blog, owner=owner)
