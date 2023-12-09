from django.db import models
from accounts.models import Shelter, Account


# Create your models here.
class Blog(models.Model):
    shelter = models.ForeignKey(Shelter, on_delete=models.CASCADE)
    title = models.CharField(max_length=125, blank=False, null=False)
    content = models.TextField(blank=False, null=False)
    timestamp = models.DateTimeField(auto_now_add=True)
    BLOG_CHOICES = (
        ("pet_training", "Pet Training"),
        ("pet_care", "Pet Care"),
        ("adoption_tips", "Adoption Tips"),
        ("other", "Other"),
    )
    blog_type = models.CharField(max_length=50, choices=BLOG_CHOICES, default="other")

    def __str__(self):
        return self.title


class Comment(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE)
    owner = models.ForeignKey(Account, on_delete=models.CASCADE)
    content = models.CharField(max_length=250, blank=False, null=False)
    timestamp = models.DateTimeField(auto_now_add=True)
