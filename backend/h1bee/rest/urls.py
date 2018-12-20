from rest_framework.urlpatterns import format_suffix_patterns
from django.conf.urls import url
from . import views
from .views import check_token
from django.conf.urls import include
from rest_framework_swagger.views import get_swagger_view

schema_view = get_swagger_view(title='Pastebin API')

urlpatterns = [
    # url(r'^docs/', docs_view),
    url(r'^swagger-docs/', schema_view),
    url(r'^city/', views.CityList.as_view()),
    url(r'^location/', views.LocationView.as_view()),

    url(r'^search/company/(?P<string>[\w\-]+)/$', views.CompanyListView.as_view()),
    url(r'^search/job/(?P<string>[\w\-]+)/$', views.JobListView.as_view()),

    url(r'^company/(?P<pk>\d+)/$', views.CompanyDetailView.as_view()),
    url(r'^job/(?P<pk>[\w\-]+)/$', views.JobDetailView.as_view()),

    url(r'^user/', views.UserList.as_view()),

    url(r'^login/', include('rest_social_auth.urls_jwt')),
    url(r'^login/', include('rest_social_auth.urls_token')),
    url(r'^login/', include('rest_social_auth.urls_session')),
    url(r'check/', check_token),
]

# urlpatterns = format_suffix_patterns(urlpatterns)
