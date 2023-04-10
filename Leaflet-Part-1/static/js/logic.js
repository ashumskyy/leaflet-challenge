var eShakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Make a GET request to the eShakeURL/
d3.json(eShakeUrl).then(function(data) {
    createFeatures(data.features);
    console.log(data)
});

function createFeatures(earthquakeData) {

    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h4>${feature.properties.place}</h4><hr>
        <p>Magnitude: ${feature.properties.mag}</p>
        <p>Date: ${new Date(feature.properties.time)}</p>`)
    };

    var earthquake = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature
    });

    createMap(earthquake)
}

function createMap(earthquakes) {

    //Base Layers
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://opentopomap.org/">OpenTopoMap</a> contributors, ' +
            '<a href="http://viewfinderpanoramas.org">SRTM</a> | ' +
            'Map style: &copy; <a href="https://opentopomap.org/">OpenTopoMap</a> ' +
            '(<a href="http://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

    var baseMaps = {
        "Street Map": street,
        "Topographic Map": topo
    };

    // Create an overlay object to hold our overlay.
    var overlayMaps = {
        Earthquakes: earthquakes
    };


    // Create our map, giving it the streetmap and earthquakes layers to display on load.
    var myMap = L.map("map", {
        center: [
            37.09, -95.71
        ],
        zoom: 5,
        layers: [street, earthquakes]
    });

    // Create a layer control.
    // Pass it our baseMaps and overlayMaps.
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
}