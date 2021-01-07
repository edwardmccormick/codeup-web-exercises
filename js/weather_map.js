"use strict";

mapboxgl.accessToken = mapBoxToken; // from keys.js file

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/navigation-preview-night-v4',
    center: [-98.4916, 29.4252],
    zoom: 11,
});



var marker = new mapboxgl.Marker({
        draggable: true,
        color: '#ADFCF9'
    })
    .setLngLat([-98.4916, 29.4252])
    .addTo(map);

var getDataOnMove = () => {
    marker.on("dragend", function () {
        var getCoordinates = this.getLngLat();
    });
}