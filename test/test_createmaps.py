from arcgis.gis import GIS
from arcgis.mapping import WebMap
from arcgis.widgets import MapView
from src import MapServices
from arcgis.mapping import MapImageLayer
import webbrowser

URL = "https://geohwp.houstontx.gov/arcgis/rest/services"
map_services = MapServices(URL).map_urls


# Create a GIS object for ArcGIS Online (you can also authenticate with your credentials)
gis = GIS()

# Create a new WebMap object
webmap = WebMap()

# Add map services
service_urls = []

# #add the first 4 map services to service_u
# for i in range(len(map_services)):
#     service_urls.append(map_services[i])

# Add each service to the WebMap
for url in map_services:
    try:
        layer = MapImageLayer(url=url)
        webmap.add_layer(layer)
    except Exception as e:
        print(url)
        print(e)

# save the webmap as a map layer in ArcGIS Online rest services on URL provided





