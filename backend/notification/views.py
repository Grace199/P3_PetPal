from django.shortcuts import get_object_or_404, render
from .models import Notification
from rest_framework.generics import RetrieveDestroyAPIView, ListAPIView
from .serializers import NotificationSerializer
from rest_framework.exceptions import PermissionDenied

"""
GET: View the notification detail with the given pk if the user is the owner.
DELETE: Owner of the notification can delete the notification.
"""
class NotificationsUpdate(RetrieveDestroyAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

    def get_object(self):
        user = self.request.user
        notification = get_object_or_404(Notification, pk=self.kwargs["pk"])
        if user != notification.user:
            raise PermissionDenied("You do not have permission to access this notification.", code=401)
        notification.is_read = True
        notification.save()
        return notification

    def get_queryset(self):
        return Notification.objects.filter(user = self.request.user)
    
    def perform_destroy(self, instance):
        if instance.user == self.request.user:
            instance.delete()
        else:
            raise PermissionDenied("You do not have permission to delete this notification.", code=401)

"""
Display a list of notifications owned by the current user.
Can be sorted base on creation_time, and can be filtered with is_read.
"""
class NotificationsListView(ListAPIView):
    serializer_class = NotificationSerializer

    def get_queryset(self):
        queryset = Notification.objects.filter(user = self.request.user)
        sort = self.request.query_params.get('sort', 'newest')
        is_read = self.request.query_params.get('is_read', "false")

        isreadvalue = True
        if is_read == "false":
            isreadvalue = False
        elif is_read == "true":
            isreadvalue = True

        if is_read:
            queryset = queryset.filter(is_read = isreadvalue)
        if sort == 'newest':
            queryset = queryset.order_by('-creation_time')
        elif sort == 'oldest':
            queryset = queryset.order_by('creation_time')
        
        return queryset