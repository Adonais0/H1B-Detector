"""h1bee URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from rest_framework.urlpatterns import format_suffix_patterns
from django.conf.urls import url
from django.conf.urls import include
# from django.contrib.auth.views import LoginView, LogoutView
from django.http import HttpResponseRedirect
from django.conf import settings

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^h1bee/api/', include('rest.urls')),
    url(r'^auth/', include('rest_framework_social_oauth2.urls')),
    url(r'^h1bee/api/rest-auth/', include('rest_auth.urls')),
    url(r'^h1bee/api/rest-auth/registration/', include('rest_auth.registration.urls'))
]

urlpatterns = format_suffix_patterns(urlpatterns)
