from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from rest_framework.routers import DefaultRouter
from books.views import BookViewSet

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

router = DefaultRouter()
router.register(r'books', BookViewSet)

schema_view = get_schema_view(
   openapi.Info(
      title="Book API",
      default_version='v1',
      description="Documentation de l'API de gestion des livres",
      contact=openapi.Contact(email="contact@smart-conseil.tn"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]
