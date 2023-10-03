require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/MapImageLayer",
    "esri/widgets/LayerList",
    "esri/widgets/Legend"
], function (Map, MapView, MapImageLayer, LayerList, Legend) {

    var layers = [];

    for (var i = 0; i < urlsFromDjango.length; i++) {
        var layer = new MapImageLayer({
            url: urlsFromDjango[i]
        });
        // Add an event listener for the 'load' event of the layer
        layer.on("load", function () {
            console.log("Layer loaded:", this.url);
        });

        layers.push(layer);
    }


    var map = new Map({
        basemap: "streets-vector",
        layers: layers
    });

    var view = new MapView({
        container: "viewDiv",
        map: map,
        popup: {
            dockEnabled: true,
            dockOptions: {
                breakpoint: false
            }
        },

        center: [-95.3698, 29.7604], // Center on Houston
        zoom: 10 // Set zoom level
    });

    // Create a LayerList widget
    var layerList = new LayerList({
        view: view
    });

    // Create the Legend widget
    var legend = new Legend({
        view: view
    });

    // Add widget to the top right corner of the view
    view.ui.add(layerList, "top-right");
    view.ui.add(legend, "bottom-right");


});
