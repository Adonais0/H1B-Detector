from django.contrib import admin
import rest.models as models

@admin.register(models.Application)
class ApplicationAdmin(admin.ModelAdmin):
	fields = [
		'approved',
	    'salary',
		'salary_unit',
        (
            'state',
            'city',
            'county',
            'postal_code'
            ),
		'dependent',
		'location',
        'job',
        'company',
        'company_location',
	]

	list_display = [
		'approved',
	    'salary',
		'salary_unit',
		'dependent',
		'location',
        'job',
        'company',
        'company_location',
	]

	list_filter = []

@admin.register(models.City)
class CityAdmin(admin.ModelAdmin):
	fields = ['city']
	list_display = ['city']
	ordering = ['city']

@admin.register(models.Company)
class CompanyAdmin(admin.ModelAdmin):
	fields = ['company', 'street_address']
	list_display = ['company', 'street_address']
	ordering = ['company', 'street_address']


@admin.register(models.JobCategory)
class JobCategoryAdmin(admin.ModelAdmin):
	fields = ['job_category']
	list_display = ['job_category']
	ordering = ['job_category']

@admin.register(models.County)
class CountyAdmin(admin.ModelAdmin):
	fields = ['county']
	list_display = ['county']
	ordering = ['county']

@admin.register(models.Job)
class JobAdmin(admin.ModelAdmin):
	fields = ['job', 'job_category']
	list_display = ['job', 'job_category']
	ordering = ['job', 'job_category']

@admin.register(models.PostalCode)
class PostalCode(admin.ModelAdmin):
	fields = ['postal_code']
	list_display = ['postal_code']
	ordering = ['postal_code']

@admin.register(models.State)
class State(admin.ModelAdmin):
	fields = ['state']
	list_display = ['state']
	ordering = ['state']
