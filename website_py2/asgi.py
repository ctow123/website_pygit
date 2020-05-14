"""
ASGI entrypoint. Configures Django and then runs the application
defined in the ASGI_APPLICATION setting.
"""

import os
import django
from channels.routing import get_default_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "website_py2.settings")
# By default, the number of threads is set to "the number of CPUs * 5", so you may see up to this number of threads.
# If you want to change it, set the ASGI_THREADS environment variable to the maximum number you wish to allow.
# os.environ.setdefault("ASGI_THREADS", "5")
django.setup()
application = get_default_application()
