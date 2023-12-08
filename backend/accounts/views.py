from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import (
    SeekerSignUpSerializer,
    ShelterSignUpSerializer,
    SeekerUpdateSerializer,
    ShelterUpdateSerializer,
    SeekerSerializer,
    ShelterSerializer,
)
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.generics import (
    CreateAPIView,
    RetrieveUpdateDestroyAPIView,
    ListAPIView,
)
from django.shortcuts import get_object_or_404
from .models import Seeker, Shelter, Account
from django.http import HttpResponse
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import AllowAny
from applications.models import Application
from rest_framework import filters


class BaseSignUpView(CreateAPIView):
    # serializer_class = None
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        serializer.validated_data.pop("password1", "")
        serializer.validated_data.pop("password2", "")
        return super().perform_create(serializer)


class SeekerCreate(BaseSignUpView):
    serializer_class = SeekerSignUpSerializer


class ShelterCreate(BaseSignUpView):
    serializer_class = ShelterSignUpSerializer


class SeekerRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Seeker.objects.all()
    serializer_class = SeekerSerializer

    def get_object(self):
        seeker = get_object_or_404(Seeker, pk=self.kwargs["pk"])

        if self.request.user == seeker.account:  # seeker viewing their own account
            return seeker
        else:
            shelter = Shelter.objects.filter(account=self.request.user)
            if not shelter:  # seekers cannot see other seeker profiles
                raise PermissionDenied(
                    detail="You do not have permission to view this profile", code=401
                )
            else:
                shelter = get_object_or_404(shelter, account=self.request.user)
                applications = Application.objects.filter(
                    seeker=seeker, shelter=shelter, status="pending"
                )  # since shelter and account have a one-to-to relationship, shelter is not a list
                if not applications:  # no open applications between shelter and seeker
                    raise PermissionDenied(
                        detail="You do not have permission to view this profile",
                        code=401,
                    )
                else:  # shelter trying to view the profile of a seeker they have an open application with
                    return seeker

    def get_serializer_class(self):
        if self.request.method in ["PUT", "PATCH"]:
            return SeekerUpdateSerializer
        return self.serializer_class

    def update(self, request, *args, **kwargs):
        user = self.get_object().account

        if self.request.user == user:
            return super().update(request, *args, **kwargs)
        else:
            raise PermissionDenied(
                detail="You do not have permission to update this seeker", code=401
            )

    def destroy(self, request, *args, **kwargs):
        seeker = self.get_object()

        if self.request.user == seeker.account:
            seeker.account.delete()
            seeker.delete()
            return super().destroy(self, request, *args, **kwargs)
        else:
            raise PermissionDenied(
                detail="You do not have permission to delete this seeker", code=401
            )


class ShelterRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Shelter.objects.all()
    serializer_class = ShelterSerializer

    def get_object(self):
        return get_object_or_404(Shelter, pk=self.kwargs["pk"])

    def get_serializer_class(self):
        if self.request.method == "PUT" or self.request.method == "PATCH":
            return ShelterUpdateSerializer
        return self.serializer_class

    def destroy(self, request, *args, **kwargs):
        shelter = self.get_object()

        if self.request.user == shelter.account:
            shelter.account.delete()
            shelter.delete()
            return super().destroy(self, request, *args, **kwargs)
        else:
            raise PermissionDenied(
                detail="You do not have permission to delete this shelter", code=401
            )

    def update(self, request, *args, **kwargs):
        shelter = get_object_or_404(Shelter, pk=self.kwargs["pk"])

        if self.request.user == shelter.account:
            return super().update(request, *args, **kwargs)
        else:
            raise PermissionDenied(
                detail="You do not have permission to update this shelter", code=401
            )


class ShelterList(ListAPIView):
    queryset = Shelter.objects.all()
    serializer_class = ShelterSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = [
        "account__name",
        "city",
        "province",
    ]

    def get_queryset(self):
        queryset = super().get_queryset()
        search_query = self.request.query_params.get("search", None)

        if search_query:
            if queryset is not None:
                queryset = (
                    queryset.filter(account__name__icontains=search_query)
                    | queryset.filter(city__icontains=search_query)
                    | queryset.filter(province__icontains=search_query)
                )
            # else:
            #     queryset = Shelter.objects.none()

        return queryset
