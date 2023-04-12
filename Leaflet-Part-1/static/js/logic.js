var eShakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Make a GET request to the eShakeURL/
d3.json(eShakeUrl).then(function(data) {
    createFeatures(data.features);
    console.log(data)
});


// This function takes in the earthquake data as an argument and creates a Leaflet GeoJSON layer from it. The onEachFeature function is defined to create popups for each earthquake marker showing its magnitude and date. The function then calls the createMap function with the earthquake GeoJSON layer as an argument.
function createFeatures(earthquakeData) {

    function styleFunction(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            weight: 0.7,
            fillColor: earthquakeColor(feature.geometry.coordinates[2]),
            radius: earthquakeRadius(feature.properties.mag)
        };
    };

    function earthquakeColor(depth) {
        if (depth > 90) {
            return '#330000';
        }
        if (depth > 70) {
            return '#660000';
        }
        if (depth > 50) {
            return '#990000';
        }
        if (depth > 30) {
            return '#cc6600';
        } else {
            return '#ffff99';
        }
    }

    function earthquakeRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }
        return magnitude * 4;
    }

    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h4>${feature.properties.place}</h4><hr>
        <p>Magnitude: ${feature.properties.mag}
        Date: ${new Date(feature.properties.time)}</p>`)
    };

    var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
        style: styleFunction,
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        }
    });

    earthquakes.addTo(myMap);
}

// function createMap(earthquakes) {

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

var earthquakes = L.layerGroup();

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


var legend = L.control({ position: 'bottomright' });

legend.onAdd = function() {

    var div = L.DomUtil.create('div', 'info legend'),
        depth = [0, 30, 50, 70, 90],
        color = ['#ffff99', '#cc6600', '#990000', '#660000', '#330000'];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < depth.length; i++) {
        div.innerHTML +=
            '<i style="background:' + color[i] + '"></i> ' +
            depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);