"""
Django settings for h1bee project.

Generated by 'django-admin startproject' using Django 2.1.3.

For more information on this file, see
https://docs.djangoproject.com/en/2.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.1/ref/settings/
"""

import os
import dj_database_url
# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 's=ui$5cf7v(02&#m6y-5($1%o%xu24iu8vcc^um!j)wtv%^=$&'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'corsheaders',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    'rest.apps.RestConfig',
    'rest_social_auth',
    'oauth2_provider',
    'social_django',
    'rest_framework_social_oauth2',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'social_django.middleware.SocialAuthExceptionMiddleware',
]

CORS_ORIGIN_WHITELIST = (
    '127.0.0.1:3000/',
    '127.0.0.1:8100/',
    '127.0.0.1:8000/',
    'http://localhost:8100/'
)

# CORS_ORIGIN_ALLOW_ALL = True

ROOT_URLCONF = 'h1bee.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'social_django.context_processors.backends',
                'social_django.context_processors.login_redirect',
            ],
        },
    },
]

WSGI_APPLICATION = 'h1bee.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases
# DATABASES = {'default': dj_database_url.parse('postgres://climwkedmxvxue:7c6806708fe62a66f043698b38c07dba5b266417483420a41e41fa0cf6f029fb@ec2-54-225-196-122.compute-1.amazonaws.com:5432/d5rgp708eh1e2s')}
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'h1bee',
        'USER': 'chuyao',
        'PASSWORD': '931217adonais',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}


# Password validation
# https://docs.djangoproject.com/en/2.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'America/New_York'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.1/howto/static-files/
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, "static")

# Authentication backends
# Must include the default Django Auth ModelBackend for the admin site
# REST_FRAMEWORK = {
#         ('oauth2_provider.contrib.rest_framework.OAuth2Authentication',
#         'rest_framework_social_oauth2.authentication.SocialAuthentication',
#     ),
# }

AUTHENTICATION_BACKENDS = (
    # 'social_core.backends.open_id.OpenIdAuth',
    # 'social_core.backends.google.GoogleOpenId',
    'rest_framework_social_oauth2.backends.DjangoOAuth2',
    'social_core.backends.google.GoogleOAuth2',
    # 'social_core.backends.google.GoogleOAuth',
    # 'social_core.backends.twitter.TwitterOAuth',
    # 'social_core.backends.yahoo.YahooOpenId',
    'django.contrib.auth.backends.ModelBackend',
)

SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = '218606464263-ah2grqe3bdpvp30i1trhgch5jue78d2g.apps.googleusercontent.com'
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = 'ppKAlmbzDLHOtCyIex1HRxZr'
SOCIAL_AUTH_URL_NAMESPACE = 'social'
SOCIAL_AUTH_RAISE_EXCEPTIONS = True
# Define SOCIAL_AUTH_FACEBOOK_SCOPE to get extra permissions from facebook. Email is not sent by default, to get it, you must request the email permission:
SOCIAL_AUTH_GOOGLE_SCOPE = ['email']
SOCIAL_AUTH_GOOGLE_PROFILE_EXTRA_PARAMS = {
    'fields': 'id, name, email'
}

CSRF_COOKIE_SECURE = True
CORS_ORIGIN_ALLOW_ALL = True

LOGIN_URL = '/auth/login/google-oauth2/'
LOGIN_REDIRECT_URL = '/'
LOGOUT_REDIRECT_URL = '/'
# DRFSO2_PROPRIETARY_BACKEND_NAME = 'h1bee'
