from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('display-map-names/', views.display_map_names, name='available_maps'),
    path('map-view/', views.map_view, name='mapview'),
    path('webmap-view/', views.webmap_view, name='webmapview'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)