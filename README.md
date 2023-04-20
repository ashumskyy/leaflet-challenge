# leaflet-challenge

### Background

The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

To help the USGS better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet, we were tasked to visualize their earthquake data.

### Approach 

1. First we got the data set in JSON GeoJSON format from https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php of "All Earthquakes" for the Past 7 Days. 

2. We imported and visualized data by plotting an interactive map using Leaflet JS library. The size of the markers reflect the magnitude of the earthquake, and the color - the depth of the earthquake. The popups provide additional information about the earthquake when its associated marker is clicked.
