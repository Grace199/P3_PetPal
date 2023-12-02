from rest_framework.serializers import ModelSerializer, DateTimeField, PrimaryKeyRelatedField, ValidationError, MultipleChoiceField
from .models import PetListing, Pet

class PetSerializer(ModelSerializer):
    class Meta:
        model = Pet
        fields = '__all__'
    
class PetListingSerializer(ModelSerializer):
    shelter = PrimaryKeyRelatedField(read_only=True)
    date_posted = DateTimeField(read_only=True)
    pet = PetSerializer()

    class Meta:
        model = PetListing
        fields = ["id", "shelter", "status", "pet", "adoption_fee", "date_posted"]

    """
    Extract the pet data from the validated_data
    Generate pet using the pet data
    Create new pet listing with the remaining validated_data as well as the new pet
    """
    def create(self, validated_data):
        # Extracting pet data
        pet_data = validated_data.pop('pet')
        pet_serializer = PetSerializer(data=pet_data)
        pet_serializer.is_valid(raise_exception=True)
        # Creating pet
        pet_instance = pet_serializer.save()

        #Creating pet listing with validated data as well as new pet
        listing_instance = PetListing.objects.create(pet=pet_instance, **validated_data)

        return listing_instance
    
    """
    Extract the pet data from validated_data
    update the pet in the petlisting
    update the petlisting
    """
    def update(self, instance, validated_data):
        pet_data = validated_data.pop('pet')

        pet_serializer = self.fields["pet"]
        pet_instance = instance.pet

        pet_serializer.update(pet_instance, pet_data)

        instance.__dict__.update(**validated_data)
        instance.save()

        return instance