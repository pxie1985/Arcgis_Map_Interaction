from src import PublishSHP

if __name__ == '__main__':
    shp_to_be_uploaded = r'data/shapefiles/LiftStation_Status.shp'
    agol_folder = 'LiftStation_Status'
    login_email = 'Peng.Xie@houstontx.gov'
    
    shp_uploader = PublishSHP(shp_to_be_uploaded)
    shp_uploader.upload_to_portal(agol_folder, login_email)