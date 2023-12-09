from django.urls import path
from .views import BlogListCreate, BlogRetrieve, CommentListCreate

app_name = "blogs"
urlpatterns = [
    path(
        "",
        BlogListCreate.as_view(),
        name="blog-list",
    ),
    path(
        "<int:blog_id>/",
        BlogRetrieve.as_view(),
        name="blog-detail",
    ),
    path(
        "<int:blog_id>/reply/",
        CommentListCreate.as_view(),
        name="comment-list",
    ),
]
