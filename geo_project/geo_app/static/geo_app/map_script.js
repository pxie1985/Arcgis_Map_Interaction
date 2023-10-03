 require([
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/MapImageLayer"
    ], function (Map, MapView, MapImageLayer) {

        var layer = new MapImageLayer({
            url: "https://geohwp.houstontx.gov/arcgis/rest/services/01_BaseData_Infrastructure/Lift_Stations/MapServer"
        });

        var map = new Map({
            layers: [layer]
        });

        var view = new MapView({
            container: "viewDiv",
            map: map
        });

    });
