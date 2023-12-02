from django.shortcuts import get_object_or_404
from rest_framework.serializers import (
    ModelSerializer,
    CharField,
    ValidationError,
    EmailField,
)
from .models import Account, Seeker, Shelter


class AccountSignUpSerializer(ModelSerializer):
    password1 = CharField(
        style={"input_type": "password"}, label="Password", write_only=True
    )
    password2 = CharField(
        style={"input_type": "password"}, label="Confirm Password", write_only=True
    )

    class Meta:
        model = Account
        fields = [
            "email",
            "name",
            "password1",
            "password2",
        ]

    def validate(self, data):
        pw1 = data.get("password1")
        pw2 = data.get("password2")

        if pw1 and pw2:
            if pw1 != pw2:
                raise ValidationError(
                    {"password2": "The two password fields didn't match"}
                )
            elif len(pw1) < 8:
                raise ValidationError(
                    {
                        "password1": "This password is too short. It must contain at least 8 characters"
                    }
                )
        return data


# seeker signup -> Create
class SeekerSignUpSerializer(ModelSerializer):
    account = AccountSignUpSerializer()

    class Meta:
        model = Seeker
        fields = [
            "account",
            "city",
            "province",
            "phone_number",
        ]

    def validate(self, data):
        pn = data.get("phone_number")

        if pn:
            if len(str(pn)) != 10:
                raise ValidationError(
                    {"phone_number": "Please enter a valid Canadian phone number."}
                )

        return data

    def create(self, validated_data):
        account_data = validated_data.pop("account")
        pw1 = account_data.pop("password1", "")
        account_data.pop("password2", "")

        # Create the Account instance
        account_instance = Account.objects.create(**account_data)
        account_instance.set_password(pw1)
        account_instance.save()

        # Create the Seeker instance with the linked Account
        seeker_instance = Seeker.objects.create(
            account=account_instance, **validated_data
        )
        return seeker_instance


# shelter signup -> Create
class ShelterSignUpSerializer(ModelSerializer):
    account = AccountSignUpSerializer()

    class Meta:
        model = Shelter
        fields = [
            "account",
            "address",
            "city",
            "province",
            "phone_number",
            "description",
        ]

    def validate(self, data):
        pn = data.get("phone_number")
        if pn:
            if len(str(pn)) != 10:
                raise ValidationError(
                    {"phone_number": "Please enter a valid Canadian phone number."}
                )
        return data

    def create(self, validated_data):
        account_data = validated_data.pop("account")
        pw1 = account_data.pop("password1", "")
        account_data.pop("password2", "")

        # Create the Account instance
        account_instance = Account.objects.create(**account_data)
        account_instance.set_password(pw1)
        account_instance.save()

        # Create the Shelter instance with the linked Account
        shelter_instance = Shelter.objects.create(
            account=account_instance, **validated_data
        )
        return shelter_instance


class AccountUpdateSerializer(ModelSerializer):
    email = EmailField(read_only=True)
    password1 = CharField(
        style={"input_type": "password"},
        label="Password",
        write_only=True,
        required=False,
    )
    password2 = CharField(
        style={"input_type": "password"},
        label="Confirm Password",
        write_only=True,
        required=False,
    )

    class Meta:
        model = Account
        fields = ["email", "name", "password1", "password2", "avatar"]

    def validate(self, data):
        pw1 = data.get("password1")
        pw2 = data.get("password2")

        if pw1:
            if pw1 != pw2:
                raise ValidationError(
                    {"password2": "The two password fields didn't match"}
                )
            elif len(pw1) < 8:
                raise ValidationError(
                    {
                        "password1": "This password is too short. It must contain at least 8 characters"
                    }
                )
        return data


# seeker update -> Update
class SeekerUpdateSerializer(ModelSerializer):
    account = AccountUpdateSerializer()

    class Meta:
        model = Seeker
        fields = [
            "account",
            "city",
            "province",
            "phone_number",
            "animal_preference",
            "breed_preference",
            "age_preference",
            "sex_preference",
            "size_preference",
            "open_to_special_needs_animals",
        ]

    def validate(self, data):
        pn = data.get("phone_number")
        if pn:
            if len(str(pn)) != 10:
                raise ValidationError(
                    {"phone_number": "Please enter a valid Canadian phone number."}
                )
        return data

    def update(self, instance, validated_data):
        account_data = validated_data.pop("account", {})

        # Update Account instance fields

        account_serializer = self.fields["account"]
        account_instance = instance.account

        pw1 = account_data.get("password1")

        if pw1:
            account_instance.set_password(pw1)
        account_serializer.update(account_instance, account_data)

        # Update Seeker instance fields
        instance.__dict__.update(**validated_data)
        instance.save()

        return instance


# shelter update -> Update
class ShelterUpdateSerializer(ModelSerializer):
    account = AccountUpdateSerializer()

    class Meta:
        model = Shelter
        fields = [
            "account",
            "address",
            "city",
            "province",
            "phone_number",
            "description",
        ]

    def validate(self, data):
        pn = data.get("phone_number")

        if pn:
            if len(str(pn)) != 10:
                raise ValidationError(
                    {"phone_number": "Please enter a valid Canadian phone number."}
                )
        return data

    def update(self, instance, validated_data):
        account_data = validated_data.pop("account", {})

        # Update Account instance fields

        account_serializer = self.fields["account"]
        account_instance = instance.account

        pw1 = account_data.get("password1")

        if pw1:
            account_instance.set_password(pw1)
        account_serializer.update(account_instance, account_data)

        # Update Seeker instance fields
        instance.__dict__.update(**validated_data)
        instance.save()

        return instance


class AccountSerializer(ModelSerializer):
    email = EmailField(read_only=True)

    class Meta:
        model = Account
        fields = ["name", "email", "avatar", "date_joined"]


# seeker base serailizer -> Get/Delete
class SeekerSerializer(ModelSerializer):
    account = AccountSerializer()

    class Meta:
        model = Seeker
        exclude = ["id"]


# shelter base serailizer -> Get/Delete
class ShelterSerializer(ModelSerializer):
    account = AccountSerializer()

    class Meta:
        model = Shelter
        exclude = ["id"]
