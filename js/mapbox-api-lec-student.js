/**********************************************
 * 			SETTING UP KEYS.JS
 *********************************************/
// TODO TOGETHER: Open .gitignore and add keys.js. Add keys.js file and import to mapbox html file. Your api keys are stored in keys.js and are added to the .gitignore so they are protected

/**********************************************
 * 			CUSTOMIZING THE MAP
 *********************************************/
// Predefined map styles --> https://docs.mapbox.com/mapbox-gl-js/api/#map
// A map center can be set by passing in the latitude and longitude coordinates of a location as an array [LONGITUDE_VALUE, LATITUDE_VALUE]
// Zoom levels range from 0 up to 24, with 0 being a global view and 24 being the most detailed at street level (the max zoom level depends on the location).

mapboxgl.accessToken = mapBoxToken; // from keys.js file
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/navigation-preview-night-v4',
    center: [-98.4916, 29.4252],
    zoom: 1,

});

//TODO TOGETHER: Set map to san antonio area using the coordinates [-98.4916, 29.4252]

//TODO: Experiment with different map styles, zoom levels, and centers. You will need to reference the mapbox docs. (~15 minutes)


/**********************************************
 * 					MARKERS
 *********************************************/
// Marker Docs --> https://docs.mapbox.com/mapbox-gl-js/api/#marker
// Markers are specific locations on a map
//Use the .setLngLat() and .addTo() methods to add marker to the map


// TODO TOGETHER: Add a marker to the map using the following coordinates [-98.4916, 29.4260]. This marker will mark the Alamo on our map.

var marker = new mapboxgl.Marker({
    draggable: true,
    color: "red",
    }
)
    .setLngLat([-98.489615, 29.426827])
    .addTo(map);

// TODO TOGETHER: Change the color of the marker


// TODO: Experiment with the color, and setting the LngLat
// TODO: Update the marker object to make the marker draggable. *Hint: reference the docs!


/**********************************************
 * 					POPUPS
 *********************************************/
// Popups are the info boxes that appear on a map and may describe a given location.
// Popup docs --> https://docs.mapbox.com/mapbox-gl-js/api/#popup


// TODO TOGETHER: Add a popup to the map over codeup. Set the html as a paragraph that says "Codeup Rocks!"
// TODO TOGETHER: Comment out the popup we just added. Add a popup to the alamo marker.


// TODO: Review the popup docs. What are some additional options we can pass to the popup?
// TODO: Try setting the text by using ".setText()" instead of ".setHTML()"



/**********************************************
 * 					Geocoder
 *********************************************/
// Geocoding Docs --> https://docs.mapbox.com/api/search/#geocoding


// TODO TOGETHER: Using the Geocoder helper function, log the coordinates of Codeup and recenter the map to focus on Codeup. Comment out previous map code.


//TODO: Using the geocode method above, add a marker at Codeup to the map
//TODO: Instead of setCenter try using map.jumpTo()
//TODO: Instead of setCenter try using map.flyTo()

geocode("600 Navarro ST #350, San Antonio, TX 78205", mapBoxToken).then(function(result){
    console.log(result);
    map.flyTo({center : result});
    map.setCenter(result);
    map.setZoom(20)
})

var timeoutId = setTimeout(function () {geocode("600 Navarro ST #350, San Antonio, TX 78205", mapBoxToken).then(function(result){
    console.log(result);
    map.flyTo({center : result});
    map.setCenter(result);
    map.setZoom(20)
}) delay)

// var popup = new mapboxgl.Popup({
//     closeOnClick: false,
//
// })
//     .setLngLat([ -98.48964067507897,29.427028642639854])
//     .setHTML('<p>Codeup Rocks!</p>')
//     .addTo(map);

// var alamoPopup = new mapboxgl.Popup({
//
// })
//     .setLngLat([-98.486128, 29.4257886])
//     .setHTML("<h1>Remember the Alamo!!!</h1>")
//     .addTo(map);
//
// marker.setPopup(alamoPopup)
//
// var sixFLagsPopup = new mapboxgl.Popup({
//
// })
//     .setLngLat([-98.61048272165688, 29.60004481517951])
//     .setHTML("<h4>Puro San Antonio</h4>")
//     .addTo(map);
//
// var sanJosePopup = new mapboxgl.Popup({
//
// })
//     .setLngLat([-98.47891524859564, 29.36117594371617])
//     .setHTML("<h4>The San Jose Historical Mission</h4>")
//     .addTo(map);

document.getElementById('alamo').addEventListener('click', function () {
    map.flyTo({center: [-98.486128, 29.4257886]})
})

document.getElementById('sixflags').addEventListener('click', function () {
    map.flyTo({center: [-98.61048272165688, 29.60004481517951]})
})

document.getElementById('sanjose').addEventListener('click', function () {
    map.flyTo({center: [-98.47891524859564, 29.36117594371617]})
})


// TODO TOGETHER: Reverse Geocoding: Using the reverse geocoding method, enter the coordinates {lng: -98.4861, lat: 29.4260} to get a physical address for the alamo
// TODO: Reverse geocode coordinates of your choice using the reverse geocode method


