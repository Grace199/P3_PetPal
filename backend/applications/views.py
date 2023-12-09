from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.urls import reverse
from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView, ListAPIView

from notification.models import Notification
from .serializers import (
    ApplicationRetrieveSerializer,
    ApplicationSeekerCreateSerializer,
    ApplicationUpdateSerializer,
)
from .models import Application
from accounts.models import Account, Shelter, Seeker
from .permissions import IsSeeker, IsShelter
from petlisting.models import PetListing
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied, ValidationError


class SeekerApplicationCreate(CreateAPIView):
    serializer_class = ApplicationSeekerCreateSerializer
    permission_classes = [IsSeeker]

    def get_queryset(self):
        petlisting = get_object_or_404(PetListing, id=self.kwargs["pk"])
        return petlisting

    def perform_create(self, serializer):
        petlisting = get_object_or_404(PetListing, id=self.kwargs["pk"])
        if petlisting.status != "AVAILABLE":
            raise ValidationError(
                detail="Cannot apply for PetListing which is not available", code=401
            )

        shelter = petlisting.shelter

        serializer.validated_data["petlisting"] = petlisting
        serializer.validated_data["shelter"] = shelter
        serializer.validated_data["seeker"] = get_object_or_404(
            Seeker, account=self.request.user
        )
        serializer.validated_data["status"] = "pending"

        serializer.save()

        application_url = f'/applications/{serializer.instance.id}'
        notification = Notification(user=serializer.instance.shelter.account, url=application_url, msg="Check out your new application!")
        notification.save()


class SeekerApplicationUpdate(RetrieveUpdateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationRetrieveSerializer
    permission_classes = [IsSeeker]

    def get_serializer_class(self):
        if self.request.method in ["PUT", "PATCH"]:
            return ApplicationUpdateSerializer
        return self.serializer_class

    def get_object(self):
        seeker = self.request.user.seeker
        application = get_object_or_404(Application, id=self.kwargs["pk"])
        if application.seeker != seeker:
            raise PermissionDenied(
                detail="Application does not belong to seeker", code=401
            )
        return application

    def perform_update(self, serializer):
        application = self.get_object()
        if application.status in ["pending", "accepted"]:
            validated_data = serializer.validated_data
            if "status" in validated_data:
                new_status = validated_data["status"]
                if new_status == "withdrawn":
                    application.status = new_status
                    application.save()
                    application.refresh_from_db()
                    return Response({"application": application})
                else:
                    raise ValidationError(
                        detail='Status can only be changed to "withdrawn', code=401
                    )
            else:
                raise ValidationError(
                    detail="Only the status of an application can be updated once submitted",
                    code=401,
                )
        else:
            raise PermissionDenied(
                detail="Application cannot be updated in its current state", code=401
            )


class ShelterApplicationUpdate(RetrieveUpdateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationRetrieveSerializer
    permission_classes = [IsShelter]

    def get_serializer_class(self):
        if self.request.method in ["PUT", "PATCH"]:
            return ApplicationUpdateSerializer
        return self.serializer_class

    def get_object(self):
        shelter = self.request.user.shelter
        application = get_object_or_404(Application, id=self.kwargs["pk"])

        if application.shelter != shelter:
            raise PermissionDenied(
                detail="Application does not belong to shelter", code=401
            )

        return application

    def perform_update(self, serializer):
        application = self.get_object()
        if application.status in ["pending"]:
            validated_data = serializer.validated_data
            if "status" in validated_data:
                new_status = validated_data["status"]
                if new_status == "accepted" or new_status == "denied":
                    application.status = new_status
                    application.save()

                    application_url = f'/applications/{serializer.instance.id}'
                    notification = Notification(user=application.seeker.account, url=application_url, msg="Your application status has changed.")
                    notification.save()
                    return Response({"status": application.status})
                else:
                    raise ValidationError(
                        detail='Status can only be changed to "denied" or "accepted"',
                        code=401,
                    )
            else:
                raise ValidationError(
                    detail="Only the status of an application can be updated once submitted",
                    code=401,
                )
        else:
            raise PermissionDenied(
                detail="Application cannot be updated in its current state", code=401
            )


class ShelterApplicationList(ListAPIView):
    serializer_class = ApplicationRetrieveSerializer
    permission_classes = [IsShelter]
    query_separator = ","

    def get_queryset(self):
        qs = Application.objects.filter(shelter=self.request.user.shelter.id)

        status_filters = self.request.query_params.get("status", None)
        sorts = self.request.query_params.get("sort", None)

        print(status_filters)

        if status_filters:
            status_list = status_filters.split(self.query_separator)
            for sl in status_list:
                if sl not in ["pending", "accepted", "denied", "withdrawn"]:
                    raise ValidationError(detail="Invalid status parameter", code=401)
            qs = qs.filter(status__in=status_filters.split(self.query_separator))

        if sorts:
            sort_list = sorts.split(self.query_separator)
            for sl in sort_list:
                if sl not in [
                    "create_time",
                    "-create_time",
                    "update_time",
                    "-update_time",
                ]:
                    raise ValidationError(detail="Invalid sort parameter", code=401)
            qs = qs.order_by(*sort_list)

        return qs

        """
        status = self.kwargs['status']
        if status is not None and status != 'all':
            query_set = query_set.filter(status=status)

        return query_set.order_by('-create_time', '-update_time')
        """


class SeekerApplicationList(ListAPIView):
    serializer_class = ApplicationRetrieveSerializer
    permission_classes = [IsSeeker]
    query_separator = ","

    def get_queryset(self):
        qs = Application.objects.filter(seeker=self.request.user.seeker.id)

        status_filters = self.request.query_params.get("status", None)
        sorts = self.request.query_params.get("sort", None)

        print(status_filters)

        if status_filters:
            status_list = status_filters.split(self.query_separator)
            for sl in status_list:
                if sl not in ["pending", "accepted", "denied", "withdrawn"]:
                    raise ValidationError(detail="Invalid status parameter", code=401)
            qs = qs.filter(status__in=status_filters.split(self.query_separator))

        if sorts:
            sort_list = sorts.split(self.query_separator)
            for sl in sort_list:
                if sl not in [
                    "create_time",
                    "-create_time",
                    "update_time",
                    "-update_time",
                ]:
                    raise ValidationError(detail="Invalid sort parameter", code=401)
            qs = qs.order_by(*sort_list)

        return qs


class ApplicationList(ListAPIView):
    serializer_class = ApplicationRetrieveSerializer

    def get_queryset(self):
        account = Account.objects.get(id=self.request.user.id)
        seeker = Seeker.objects.filter(account=account).first()
        shelter = Shelter.objects.filter(account=account).first()

        if seeker:
            queryset = Application.objects.filter(seeker=seeker)
        elif shelter:
            queryset = Application.objects.filter(shelter=shelter)
        else:
            queryset = Application.objects.none()

        return queryset
