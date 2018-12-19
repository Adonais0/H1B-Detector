from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *
# Authentication Protect
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

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
        serializer = JobSerializer(job, many=False)
        return Response(serializer.data)

    def post(self):
        pass

# Authentication
