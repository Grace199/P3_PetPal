from django.db import models
from accounts.models import Account, Seeker, Shelter
from applications.models import Application


# Review
class Review(models.Model):
    owner = models.ForeignKey(Account, on_delete=models.CASCADE)
    shelter = models.ForeignKey(Shelter, on_delete=models.CASCADE)
    RATING_CHOICES = (
        (0, "0"),
        (1, "1"),
        (2, "2"),
        (3, "3"),
        (4, "4"),
        (5, "5"),
    )
    rating = models.PositiveSmallIntegerField(choices=RATING_CHOICES, default=5)
    content = models.CharField(max_length=500, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    hasReplies = models.BooleanField(default=False)


# Reply
class Reply(models.Model):
    owner = models.ForeignKey(Account, on_delete=models.CASCADE)
    review = models.ForeignKey(Review, on_delete=models.CASCADE)
    content = models.CharField(max_length=500, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    isSelf = models.BooleanField(default=False)


# Message
class Message(models.Model):
    application = models.ForeignKey(Application, on_delete=models.SET_NULL, null=True)
    owner = models.ForeignKey(Account, on_delete=models.CASCADE)
    content = models.CharField(max_length=500, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
