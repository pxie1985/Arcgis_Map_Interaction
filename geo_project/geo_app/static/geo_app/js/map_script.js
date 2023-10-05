require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/MapImageLayer",
    "esri/widgets/LayerList",
    "esri/widgets/Legend",
    "esri/widgets/BasemapGallery",
    "esri/widgets/Expand"

], function (Map, MapView, MapImageLayer, LayerList, Legend, BasemapGallery, Expand) {

    var map = new Map({
        basemap: "topo-vector"
    });

    var view = new MapView({
        container: "viewDiv",
        map: map,
        zoom: 10,
        center: [-95.3698, 29.7604]
    });

    var layerList = new LayerList({
        view: view
    });
    var layerListExpand = new Expand({
        view: view,
        content: layerList,
        expanded: false,
        group: "top-right"
    });
    view.ui.add(layerListExpand, "top-right");


    // Add Legend widget
    var legend = new Legend({
        view: view
    });
    var legendExpand = new Expand({
        view: view,
        content: legend,
        expanded: false,
        group: "bottom-right"
    });
    view.ui.add(legendExpand, "bottom-right");

    // Add BasemapGallery widget
    var basemapGallery = new BasemapGallery({
        view: view
    });

    var basemapExpand = new Expand({
        view: view,
        content: basemapGallery,
        expanded: false  // This ensures the widget starts in a collapsed state
    });
    view.ui.add(basemapExpand, "top-left");


    function addLayersFromList(urls) {
        urls.forEach(function (url) {
            var layer = new MapImageLayer({
                url: url
            });
            map.add(layer);
        });
    }


    ////////////////////////////////////////////////////////////////////////////
    function clearExistingMapServiceLayers() {
        var layers = map.layers.toArray();
        for (var i = layers.length - 1; i >= 0; i--) {
            if (layers[i].type === "map-image") {
                map.remove(layers[i]);
            }
        }
    }

    window.updateMapLayers = function () {
        if (window.selectedUrls && Array.isArray(window.selectedUrls) && window.selectedUrls.length > 0) {
            clearExistingMapServiceLayers();  // Remove existing map service layers
            addLayersFromList(window.selectedUrls); // Add layers based on window.selectedUrl
        }
    };

    // Initial call to set up the map based on the initial list
    window.updateMapLayers();

    // Add LayerList widget


});