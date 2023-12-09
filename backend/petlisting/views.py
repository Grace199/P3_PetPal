from django.shortcuts import get_object_or_404
from django.urls import reverse
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from notification.models import Notification
from .serializers import *
from .models import *
from accounts.models import *
from rest_framework.exceptions import PermissionDenied

class PetListingDetail(RetrieveUpdateDestroyAPIView):
    queryset = PetListing.objects.all()
    serializer_class = PetListingSerializer

    def perform_update(self, serializer):
        # Check if the current user is the petlisting shelter
        if serializer.instance.shelter.account == self.request.user:
            serializer.save()
        else: # If not then request is denied
            raise PermissionDenied("You do not have permission to update this listing.")

    def perform_destroy(self, instance):
        # Check if the current user is the petlisting shelter
        if instance.shelter.account == self.request.user:
            instance.pet.delete()
            instance.delete()
        else: # If not then request is denied
            raise PermissionDenied("You do not have permission to delete this listing.")


class PetListingListCreate(ListCreateAPIView):
    serializer_class = PetListingSerializer

    def get_queryset(self):
        # Get all of the petlistings
        queryset = PetListing.objects.all()

        # Take in query parameters for pet listinng

        #### Changed from id to name
        # shelter_id = self.request.query_params.get('shelter', None)
        shelter_name = self.request.query_params.get('shelter', None)
        status = self.request.query_params.get('status', 'AVAILABLE')

        # Take in query parameters for pet
        animal = self.request.query_params.get('animal', None)
        breed = self.request.query_params.get('breed', None)
        age = self.request.query_params.get('age', None)
        size = self.request.query_params.get('size', None)
        colour = self.request.query_params.get('colour', None)
        sex = self.request.query_params.get('sex', None)

        # Take in query parameters for sort
        sort = self.request.query_params.get('sort', 'name')

        # Base on the query parameters, sort and filter accordingly
        if shelter_name:
            ### Query by shelter name instead
            account = Account.objects.filter(name=shelter_name).first()
            shelter = Shelter.objects.filter(account=account).first()
            # shelter = get_object_or_404(Shelter, id=shelter_id)
            queryset = queryset.filter(shelter=shelter)

        if status:
            queryset = queryset.filter(status__iexact=status)

        ###### Need to check of animal filter work
        if animal:
            queryset = queryset.filter(pet__animal_type__iexact=animal)
        if breed:
            queryset = queryset.filter(pet__breed__iexact=breed)
        if age:
            queryset = queryset.filter(pet__age=age)
        if size:
            queryset = queryset.filter(pet__size=size)
        if colour:
            queryset = queryset.filter(pet__colour__iexact=colour)
        if sex:
            queryset = queryset.filter(pet__sex__iexact=sex)

        if sort == 'age':
            queryset = queryset.order_by('pet__age')
        elif sort == 'name':
            queryset = queryset.order_by('pet__name')
        elif sort == 'size':
            queryset = queryset.order_by('pet__size')

        # Return the sorted and filtered data set
        return queryset
    
    def perform_create(self, serializer):
        # Check if the current user is a seeker
        seeker = Seeker.objects.filter(account=self.request.user)
        if seeker:
            raise PermissionDenied(
                detail="You do not have permission to create a pet listing",
                code=401,
            )
        
        # Get the shelter associated with the currrent user
        shelter = Shelter.objects.get(account=self.request.user)
        if shelter:
            # Set the shelter to be the current user
            serializer.save(shelter=shelter)

            # Extract information of the pet
            pet_data = self.request.data.get('pet', {})
            animal = pet_data.get("animal_type")
            breed = pet_data.get("breed")
            age = pet_data.get("age")
            size = pet_data.get("size")
            sex = pet_data.get("sex")
            special_needs = pet_data.get("special_needs")
            if special_needs and len(special_needs) > 0:
                is_special_needs = True
            else:
                is_special_needs = False
            
            petlisting_detail_url = f'/petdetail/{serializer.instance.id}'
            all_seekers = Seeker.objects.all()
            message = "A new pet you might like!"
            send_notif = False

            # Go through all of the seeker and see if any of them would be interested in the pet
            for seeker in all_seekers:
                if seeker.animal_preference == animal:
                    send_notif = True
                elif seeker.breed_preference == breed:
                    send_notif = True
                elif seeker.age_preference == age:
                    send_notif = True
                elif seeker.sex_preference == sex:
                    send_notif = True
                elif seeker.size_preference == size:
                    send_notif = True
                elif seeker.open_to_special_needs_animals == is_special_needs:
                    send_notif = True

                # If any preference matches, then generate a notification to alert the user
                if send_notif:
                    notification = Notification(user=seeker.account, url=petlisting_detail_url, msg=message)
                    notification.save()
        else:
            raise PermissionDenied(
                    detail="You do not have permission to create a pet listing",
                    code=401,
                )
