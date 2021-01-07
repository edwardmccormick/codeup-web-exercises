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

var lnglat
function onDragEnd() {
    lnglat = marker.getLngLat();
    document.getElementById('latitudedisplay').value = lnglat.lat;
    document.getElementById('longitudedisplay').value = lnglat.lng;
    map.flyTo({
        center: [lnglat.lng, lnglat.lat],
    })
}

marker.on('dragend', onDragEnd);