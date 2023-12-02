from rest_framework import permissions
from accounts.models import Seeker, Shelter


class IsSeeker(permissions.BasePermission):
    """
    Custom permission to check if the user is a Seeker.
    """

    def has_permission(self, request, view):
        return hasattr(request.user, "seeker")
class IsShelter(permissions.BasePermission):
    """
    Custom permission to check if the user is a Shelter.
    """

    def has_permission(self, request, view):
        return hasattr(request.user, "shelter")
