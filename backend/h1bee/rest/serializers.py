from rest_framework import serializers
from rest.models import *


# LOCATION
class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = State
        fields = ('state_id', 'state')

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ('city_id', 'city')

class PostalCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostalCode
        fields = ('postal_code_id', 'postal_code')

class LocationSerializer(serializers.ModelSerializer):
    city_id = CitySerializer(read_only=True)
    state_id = StateSerializer(read_only=True)
    postal_code_id = PostalCodeSerializer(read_only=True)

    class Meta:
        model = Location
        fields = ('location_id', 'city_id',  'state_id', 'postal_code_id')

# ============= JOB ================= #
class JobCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = JobCategory
        fields = ('job_category_id', 'job_category')


class JobsSerializer(serializers.ModelSerializer):
    job_category = JobCategorySerializer(read_only=True)

    class Meta:
        model = Job
        fields = ('job_id', 'job', 'job_category')

class CompanyJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyJob
        fields = ('company_job_id', 'job', 'company')

class JobSerializer(serializers.ModelSerializer):
    company_job = CompanyJobSerializer(
        many = True,
        read_only = True
    )
    job_category = JobCategorySerializer(read_only=True)
    class Meta:
        model = Job
        fields = ('job_id', 'job', 'job_category', 'company_job')


# ============== COMPANY ============= #
class CompaniesSerializer(serializers.ModelSerializer):

    location = LocationSerializer(read_only=True)
    class Meta:
        model = Company
        fields = ('company_id', 'company', 'street_address',
        'location')

class CompanySerializer(serializers.ModelSerializer):
    company_job = CompanyJobSerializer(
        many = True,
        read_only = True
    )
    location = LocationSerializer(read_only=True)

    class Meta:
        model = Company
        fields = ('company_id', 'company', 'street_address','location', 'company_job')

#=================AUTHENTICATION===============#
# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Users
#         fields = ('id', 'user_name')
