"""Development settings"""
import os
from .base import *

DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('POSTGRES_DATABASE_NAME'),
        'USER': 'postgres',
        'PASSWORD': os.getenv("SECRPOSTGRES_DATABASE_PASSWORD")
    }
}
