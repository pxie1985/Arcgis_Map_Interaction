console.log("JavaScript file is loaded!");

require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/MapImageLayer"
], function (Map, MapView, MapImageLayer) {

    var layer = new MapImageLayer({
        url: "https://geohwp.houstontx.gov/arcgis/rest/services/01_BaseData_Infrastructure/Force_Mains/MapServer"

    });

    console.log("Layer created:", layer);  // Log after creating the layer

    var map = new Map({
        layers: [layer]
    });


    console.log("Map created:", map);  // Log after creating the map


    var view = new MapView({
        container: "viewDiv",
        zoom: 10,
        center: [-95.3698, 29.7604]
    });
    console.log("View created:", view);  // Log after creating the view

});