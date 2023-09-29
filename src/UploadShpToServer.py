import os
import pandas as pd
from arcgis.geometry import SpatialReference
import shutil
import time
from arcgis.gis import GIS


class PublishSHP:
    
    def __init__(self, shp_to_be_uploaded: str):
        self.shpPath = shp_to_be_uploaded
        self.sdf = None
        self.app_folder = os.path.join(os.environ['APPDATA'], 'ArcGIS_MAP')
        self.shpzip = None
    
    def _importSHP(self):
        self.sdf = pd.DataFrame.spatial.from_featureclass(self.shpPath)
        # if the shapefile is empty raise an error
        if self.sdf.empty:
            raise Exception('The shapefile is empty')
        
        # if the shapefile is not empty, check if it has projection or not
        if self.sdf.spatial.sr is None:
            self.sdf.spatial.sr = SpatialReference(2278)
    
    def _create_shpzip(self):
        """
        The AGOL only accept physical shpfile in a zip folder on the appdata folder, so this function is designed to
        move the previously created shapefile into a zip folder, which will be uploaded to AGOL

        :param layer_name: The name of the feature layer you will create on AGOL
        :param outputshp_path:the path for the exported shp file
        :return:
        """
        # get the file name of the shapefile
        stem_name = self.shpPath.split('.')[0].split('\\')[-1]
        
        # get the directory of the shapefile
        shp_dir = os.path.dirname(self.shpPath)
        
        # get the list files accosiated with the shapefile
        shp_list = [x for x in os.listdir(shp_dir) if x.split('.')[0] == stem_name]
        # only keep extension of the files .cpg, .shp, .dbf, .prj, .shx and exclude the lock file
        shp_list = [x for x in shp_list if x.split('.')[-1] in ['cpg', 'shp', 'dbf', 'prj', 'shx']]
        shp_list = [x for x in shp_list if not x.endswith('lock')]
        
        # create a folder to store the shapefile in AppData
        
        # if AppData folder does not exist, create one
        if not os.path.exists(self.app_folder):
            os.makedirs(self.app_folder)
        
        temp_folder_path = os.path.join(self.app_folder, stem_name)
        if not os.path.exists(temp_folder_path):
            os.makedirs(temp_folder_path)
        
        # copy the shapefile to the folder
        for file in shp_list:
            shutil.copy(os.path.join(shp_dir, file), temp_folder_path)
        
        # zip the folder
        shutil.make_archive(temp_folder_path, 'zip', temp_folder_path)
        self.shpzip = temp_folder_path + '.zip'
    
    def _upload_shpzip_to_AGOL(self, agol_folder: str, login_email: str):
        
        # create a folder in AGOL if it does not exist
        gis = GIS("pro")
        try:
            gis.content.create_folder(agol_folder)
        
        except Exception as e:
            print('Failed to access to AGOL DUE TO: ', e)
            raise Exception('Failed to access to AGOL')
        
        items_shp = {
            "title": agol_folder,
            "tags": "uploaded via python",
            "type": "Shapefile"
        }
        
        fc_query = f'title:{items_shp["title"]} AND tags:uploaded via python AND type: Shapefile AND owner:{login_email}'
        shp_search = gis.content.search(query=fc_query, max_items=1)  # delete the pre-exisitng shp file zip
        
        # check if the shp file already exists in the AGOL folder, update it so that the layerID will be the same thus the webmap will not be broken
        if shp_search:
            self.__update_existing_layer(agol_folder, shp_search)
            
            # if the shp file does not exist in the AGOL folder just upload it
        else:
            self.__upload_new_layer(agol_folder, gis, items_shp)
    
    def __upload_new_layer(self, agol_folder, gis, items_shp):
        print("new load of shapefile.")
        # load it
        shpfileItem = gis.content.add(item_properties=items_shp, data=self.shpzip, folder=agol_folder)
        published_service = shpfileItem.publish()
        print(f"Feature layer {agol_folder} is now online!\n")
        print(f'You can access to the feature layer at REST API via {published_service.url}')
        print(f'You can access to the feature layer at the Homepage via {published_service.homepage}')
    
    def __update_existing_layer(self, agol_folder:str, shpSearch:list):
        print(f'{agol_folder} already exists. The app will update the prexisting zip file in the AGOL folder.')
        shp_to_update = shpSearch[0]
        shp_to_update.update(data=self.shpzip)
        to_be_uploaded = True
        trials = 1
        while to_be_uploaded and (trials <= 5):
            try:
                published_service = shp_to_update.publish(
                    overwrite=True)  # this is not async.. you have to wait for it to complete.
                while published_service.status()['status'] == 'processing':
                    print(published_service.status()['status'])
                    time.sleep(2)
                
                # shp_publish["groups"] = group_id
                # shp_publish.share(groups= [group_id])
                print(f"Feature layer {agol_folder} is now online!\n")
                print(f'You can access to the feature layer at REST API via {published_service.url}')
                print(f'You can access to the feature layer at the Homepage via {published_service.homepage}')
                to_be_uploaded = False
            except:
                print(f'Upload failed. Try again\n')
                time.sleep(5)
                trials += 1
    
    def _remove_temps(self):
        #remove everything within the app temp folder
        shutil.rmtree(self.app_folder)
    
    def upload_to_portal(self, agol_folder:str, login_email:str):
        
        # steps
        self._importSHP()
        self._create_shpzip()
        self._upload_shpzip_to_AGOL(agol_folder, login_email)
        self._remove_temps()



