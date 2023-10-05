from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

from src import MapServices

# Create your views here.
def fetch_urls():
    URL = "https://geohwp.houstontx.gov/arcgis/rest/services"
    mapservices = MapServices(URL)
    map_services_urls = mapservices.map_urls
    return map_services_urls

def display_map_names(request):
    urls = fetch_urls()
    return render(request, 'geo_app/map_names.html', {'urls': urls})


def index(request):
    return render(request, 'geo_app/index.html')

@csrf_exempt
def map_view(request):
    urls = fetch_urls()
    return render(request, 'geo_app/MapView.html', {'urls': urls})

def webmap_view(request):
    return render(request, 'geo_app/webmap-view.html')