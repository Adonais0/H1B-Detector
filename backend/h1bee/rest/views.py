from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *
# Authentication Protect
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from rest_framework.authtoken.models import Token
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from rest_framework.decorators import api_view
from django.http import HttpResponse, JsonResponse

# Create your views here.
class CityList(APIView):
    # Return all the cities
    def get(self, request):
        cities = City.objects.all()
        serializer = CitySerializer(cities, many=True)
        return Response(serializer.data)

    def post(self):
        pass

class LocationView(APIView):
    def get(self, request):
        locations = Location.objects.all()
        serializer = LocationSerializer(locations, many=True)
        return Response(serializer.data)

class CompanyListView(APIView):
    def get(self, request, string):
        companies = Company.objects.all().filter(company__contains = string)
        serializer = CompaniesSerializer(companies, many=True)
        return Response(serializer.data)

    def post(self):
        pass

class CompanyDetailView(APIView):
    def get(self, request, pk):
        company = Company.objects.get(pk=pk)
        serializer = CompanySerializer(company, many=False)
        return Response(serializer.data)

    def post(self):
        pass

class JobListView(APIView):
    def get(self, request, string):
        jobs = Job.objects.all().filter(job__contains = string)
        serializer = JobsSerializer(jobs, many=True)
        return Response(serializer.data)

    def post(self):
        pass

class JobDetailView(APIView):
    def get(self, request, pk):
        job = Job.objects.get(pk=pk)
        companies = job.company_set.all()

        job_serializer = JobSerializer(job, many=False)
        companies_serializer = CompaniesSerializer(companies, many=True)

        content = {
            'position': job_serializer.data,
            'companies': companies_serializer.data
        }
        return Response(content)

    def post(self):
        pass


class CategoryView(APIView):
    def get(self, request):
        category = JobCategory.objects.all()
        serializer = JobCategorySerializer(category, many=True)
        return Response(serializer.data)

    def post(self):
        pass

# Authentication
class UserList(generics.ListAPIView):
    def get(self, request):
        user = Users.objects.all()
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data)

class CurrentUser(generics.RetrieveAPIView):
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

@csrf_exempt
@api_view(['POST'])
def check_token(request, format=None):
    # Test if token exist in database
     token = Token.objects.filter(key = request.data['token']).exists()
     return JsonResponse({"status": token})

# CRUD
class CreateJobView(APIView):
    def post(self, request):
        serializer = JobCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self):
        pass
