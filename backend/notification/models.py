from django.db import models
from accounts.models import Account

"""
Model for notifications.
Each notification belongs to a single user, which can be a seeker or a shelter.
is_read specifies whether or not the notification has been read or accessed.
creation_time is the datetime for when the notification is generated.
msg is the message that describe the notification.
"""
class Notification(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    url = models.CharField(max_length=200)
    is_read = models.BooleanField(default=False)
    creation_time = models.DateTimeField(auto_now_add=True)
    msg = models.CharField(max_length=200)