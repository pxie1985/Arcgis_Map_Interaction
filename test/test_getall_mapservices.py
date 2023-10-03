from src import MapServices


if __name__ == "__main__":

    URL = "https://geohwp.houstontx.gov/arcgis/rest/services"
    
    mapservices = MapServices(URL)
    map_services_urls = mapservices.map_urls
    print( map_services_urls)
    map_services_ids = mapservices.get_mapservice_ids()
    print( map_services_ids)

    




    
            
