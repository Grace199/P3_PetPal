from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from accounts.models import Shelter, Seeker
from rest_framework.views import APIView


# Reply -> Retrieve
class CurrentUserDetail(APIView):
    def get(self, request):
        is_seeker = False
        account = request.user

        try:
            user = Seeker.objects.get(account=account)
            is_seeker = True
        except Seeker.DoesNotExist:
            try:
                user = Shelter.objects.get(account=account)
            except Shelter.DoesNotExist:
                return HttpResponse(status=401)

        ret_val = {
            "id": user.id,
            "is_seeker": is_seeker,
        }
        return JsonResponse(ret_val)
