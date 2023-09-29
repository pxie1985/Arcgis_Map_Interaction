import requests

class MapServices:
    def __init__(self, url):
        self.url = url
        self.mapservices = []
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
                    self.mapservices.append(map_service_url)
        return self.mapservices