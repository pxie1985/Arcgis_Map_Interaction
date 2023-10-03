from django.urls import path
from . import views

urlpatterns = [
    path('display-map-names/', views.display_map_names, name='available_maps'),
    path('single-map/', views.index, name='index'),
    path('map-view/', views.map_view, name='mapview'),
]