from rest_framework.urlpatterns import format_suffix_patterns
from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^city/', views.CityList.as_view()),
    url(r'^location/', views.LocationView.as_view()),

    url(r'^search/company/(?P<string>[\w\-]+)/$', views.CompanyListView.as_view()),
    url(r'^search/job/(?P<string>[\w\-]+)/$', views.JobListView.as_view()),

    url(r'^company/(?P<pk>\d+)/$', views.CompanyDetailView.as_view()),
    url(r'^job/(?P<pk>[\w\-]+)/$', views.JobDetailView.as_view()),
]

# urlpatterns = format_suffix_patterns(urlpatterns)
