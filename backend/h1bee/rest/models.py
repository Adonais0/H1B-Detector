# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models

class Application(models.Model):
    application_id = models.AutoField(primary_key=True)
    approved = models.CharField(max_length=100, blank=True, null=False)
    salary = models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)
    salary_unit = models.CharField(max_length=10, blank=True, null=True)
    dependent = models.CharField(max_length=20, blank=True, null=True)
    location = models.ForeignKey('Location', models.PROTECT, blank=True, null=True)
    job = models.ForeignKey('Job', models.PROTECT, blank=True, null=True)
    company = models.ForeignKey('Company', models.PROTECT, blank=True, null=True)
    company_location = models.ForeignKey('Location', models.PROTECT, blank=True, null=True, related_name='%(class)s_requests_created')

    class Meta:
        managed = False
        db_table = 'application'

    def __str__(self):
        return self.application_id


class City(models.Model):
    city_id = models.AutoField(primary_key=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    state = models.ForeignKey('State', models.PROTECT, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'city'

    def __str__(self):
        return self.city


class CompanyJob(models.Model):
    company_job_id = models.AutoField(primary_key=True)
    company = models.ForeignKey('Company', models.CASCADE, blank=True, null=True)
    job = models.ForeignKey('Job', models.CASCADE, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'company_job'

class Job(models.Model):
    job_id = models.AutoField(primary_key=True)
    job = models.CharField(max_length=255, blank=True, null=True)
    job_category = models.ForeignKey('JobCategory', models.PROTECT, blank=True, null=True)
    # company_job = models.ManyToManyField(Company, through='CompanyJob')

    class Meta:
        managed = False
        db_table = 'job'

    def __str__(self):
        return self.job

    # @property
    # def companies(self):
    #     companies = self.job_

class Company(models.Model):
    company_id = models.AutoField(primary_key=True)
    company = models.CharField(max_length=255, blank=True, null=True)
    street_address = models.TextField(blank=True, null=True)
    location = models.ForeignKey('Location', models.PROTECT, blank=True, null=True)

    # Intermediate model (job -> company_job <- company)
    company_job = models.ManyToManyField(Job, through='CompanyJob')

    class Meta:
        managed = False
        db_table = 'company'

    def __str__(self):
        return self.company




class County(models.Model):
    county_id = models.AutoField(primary_key=True)
    county = models.CharField(max_length=255, blank=True, null=True)
    state = models.ForeignKey('State', models.PROTECT, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'county'

    def __str__(self):
        return self.county


class JobCategory(models.Model):
    job_category_id =models.AutoField(primary_key=True)
    job_category = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'job_category'

    def __str__(self):
        return self.job_category


class Location(models.Model):
    location_id = models.AutoField(primary_key=True)
    city_id = models.ForeignKey('City', models.PROTECT, db_column='city_id', blank=True, null=True)  # Field renamed because of name conflict.
    county_id = models.ForeignKey('County', models.PROTECT, db_column='county_id', blank=True, null=True)  # Field renamed because of name conflict.
    state_id = models.ForeignKey('State', models.PROTECT, db_column='state_id', blank=True, null=True)  # Field renamed because of name conflict.
    postal_code_id = models.ForeignKey('PostalCode', models.PROTECT, db_column='postal_code_id', blank=True, null=True)  # Field renamed because of name conflict.

    class Meta:
        managed = False
        db_table = 'location'


class PostalCode(models.Model):
    postal_code_id =models.AutoField(primary_key=True)
    postal_code = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'postal_code'

    def __str__(self):
        return self.postal_code


class State(models.Model):
    state_id = models.AutoField(primary_key=True)
    state = models.CharField(max_length = 10, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'state'

    def __str__(self):
        return self.state

# class Users(models.Model):
#     id = models.AutoField(primary_key=True)
#     user_name = models.CharField(max_length = 10, blank=True, null=True)
#
#     class Meta:
#         managed = False
#         db_table = 'user'
#
#     def __str__(self):
#         return self.user_name
