from rest_framework.serializers import ModelSerializer, DateTimeField, ListField, \
    PrimaryKeyRelatedField, HyperlinkedRelatedField, ReadOnlyField
from .models import Application
from petlisting.serializers import PetListingSerializer
from accounts.serializers import SeekerSerializer, ShelterSerializer
from petlisting.serializers import PetListingSerializer

class ApplicationRetrieveSerializer(ModelSerializer):
    seeker = SeekerSerializer(read_only=True)
    petlisting = PetListingSerializer(read_only=True)
    shelter = ShelterSerializer(read_only=True)
    
    class Meta:
        model = Application
        fields = '__all__'
        read_only_fields = ['residence_type', 'fenced_yard', 'pool', 'status', 'current_pets',
                            'address', 'city', 'postal_code', 'phone_number', 'other', 
                            'children', 'children_under_13', 'good_fit', 'schedule', 'insurance', 
                            'references', 'vet', 'questions']

class ApplicationSeekerCreateSerializer(ModelSerializer):
    seeker = PrimaryKeyRelatedField(read_only=True)
    petlisting = PrimaryKeyRelatedField(read_only=True)
    shelter = PrimaryKeyRelatedField(read_only=True)
    status = ReadOnlyField()
    class Meta:
        model = Application
        fields = '__all__'

class ApplicationUpdateSerializer(ModelSerializer):
    seeker = SeekerSerializer(read_only=True)
    petlisting = PetListingSerializer(read_only=True)
    shelter = ShelterSerializer(read_only=True)
    class Meta:
        model = Application
        fields = '__all__'
        read_only_fields = ['residence_type', 'fenced_yard', 'pool', 'current_pets',
                            'address', 'city', 'postal_code', 'phone_number', 'other', 
                            'children', 'children_under_13', 'good_fit', 'schedule', 'insurance', 
                            'references', 'vet', 'questions']


        
    
    