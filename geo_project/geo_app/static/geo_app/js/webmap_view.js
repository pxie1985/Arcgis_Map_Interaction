 require([
     "esri/config",
    "esri/WebMap",
    "esri/views/MapView"
], function (esriConfig,WebMap, MapView) {
// Set the API key on the esriConfig
    // WebMap instance referencing a webmap item on ArcGIS Online or ArcGIS Enterprise
    var webmap = new WebMap({
        portalItem: {
            id: "8e42e164d4174da09f61fe0d3f206641"  // Replace with your webmap ID
        }
    });

    // Create the map view
    var view = new MapView({
        map: webmap,
        container: "webmapView"  // Matches the div ID in your HTML
    });

});