from arcgis.gis import GIS
from arcgis.mapping import WebMap
from arcgis.widgets import MapView
from src import MapServices
from arcgis.mapping import MapImageLayer
import webbrowser

URL = "https://geohwp.houstontx.gov/arcgis/rest/services"
map_services = MapServices(URL).mapservices


# Create a GIS object for ArcGIS Online (you can also authenticate with your credentials)
gis = GIS()

# Create a new WebMap object
webmap = WebMap()

# Add map services
service_urls = []

#add the first 4 map services to service_u
for i in range(1):
    service_urls.append(map_services[i])

# Add each service to the WebMap
for url in service_urls:
    try:
        layer = MapImageLayer(url=url)
        webmap.add_layer(layer)
    except Exception as e:
        print(url)
        print(e)

# save the webmap to mapservice of the provided url
# webmap.save(item_properties={'title':'test_webmap', 'tags':'test'}, thumbnail='thumbnail.png', folder='test')

