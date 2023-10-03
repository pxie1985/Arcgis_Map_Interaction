import requests


class MapServices:
    def __init__(self, url):
        self.url = url
        self.map_urls = []
        self._get_map_services()

    def _get_map_services(self):
        response = requests.get(self.url + "?f=json")
        data = response.json()
        for folder in data['folders']:
            service_name = folder
            folder_url = self.url + "/" + service_name
            # get all map services in the folder
            response = requests.get(folder_url + "?f=json")
            folder_data = response.json()
            for service in folder_data['services']:
                if service['type'] == 'MapServer':
                    # get the map service url
                    map_service_url = self.url + "/" + service['name'] + "/" + service['type']
                    self.map_urls.append(map_service_url)
        return self.map_urls
    
    # get webmap IDs of all map services
    def get_mapservice_ids(self):
        mapservice_ids = []
        for mapservice_url in self.map_urls:
            response = requests.get(mapservice_url + "?f=json")
            data = response.json()
            mapservice_ids.append(data['mapName'])
        return mapservice_ids


if __name__ == "__main__":
    URL = "https://geohwp.houstontx.gov/arcgis/rest/services"
    
    mapservices = MapServices(URL)
    map_services_urls = mapservices.map_urls
    print(map_services_urls)
    map_services_ids = mapservices.get_mapservice_ids()
    print(map_services_ids)
    
