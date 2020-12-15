/**********************************************
 * 			SETTING UP KEYS.JS
 *********************************************/
// TODO TOGETHER: Open .gitignore and add keys.js. Add keys.js file and import to mapbox html file. Your api keys are stored in keys.js and are added to the .gitignore so they are protected

mapboxgl.accessToken = mapBoxToken; // from keys.js file
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/navigation-preview-night-v4',
    center: [-98.4916, 29.4252],
    zoom: 11,

});


var marker = new mapboxgl.Marker({
        color: "red",
    }
)
    .setLngLat([-98.46612413112699, 29.46110514409459])
    .addTo(map);

var pigpenPopup = new mapboxgl.Popup({
    closeOnClick: true,
})
    .setLngLat([-98.46612413112699, 29.46110514409459])
    .addTo(map);

document.getElementById('alamo').addEventListener('click', function () {
    map.flyTo({center: [-98.486128, 29.4257886]})
})

document.getElementById('sixflags').addEventListener('click', function () {
    map.flyTo({center: [-98.61048272165688, 29.60004481517951]})
})

document.getElementById('sanjose').addEventListener('click', function () {
    map.flyTo({center: [-98.47891524859564, 29.36117594371617]})
})
