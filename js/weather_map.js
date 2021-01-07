"use strict";

mapboxgl.accessToken = mapBoxToken; // from keys.js file

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/navigation-preview-night-v4',
    center: [-98.4916, 29.4252],
    zoom: 11,
});

var lnglat = {lat:29.4252, lng:-98.4916}

var marker = new mapboxgl.Marker({
        draggable: true,
        color: '#000080'
    })
    .setLngLat([lnglat.lng, lnglat.lat])
    .addTo(map);



var weatherBulk

function onDragEnd() {
    lnglat = marker.getLngLat();
    document.getElementById('latitudedisplay').value = lnglat.lat;
    document.getElementById('longitudedisplay').value = lnglat.lng;
    map.flyTo({
        center: [lnglat.lng, lnglat.lat],
    })
    $.get("https://api.openweathermap.org/data/2.5/onecall", {
        APPID: OPEN_WEATHER_APPID,
        lat: lnglat.lat,
        lon: lnglat.lng,
        units: 'imperial',
        exclude: 'minutely,hourly'
    }).done(function(data) {
        console.log(data);
        weatherBulk = data;
        renderForecast();
        reverseGeocoding();
    })
}

onDragEnd()

marker.on('dragend', onDragEnd);

$(document).ready(function() {
    // Ajax call to OpenWeatherAPI
    $.get("https://api.openweathermap.org/data/2.5/onecall", {
        APPID: OPEN_WEATHER_APPID,
        lat: lnglat.lat,
        lon: lnglat.lng,
        units: 'imperial',
        exclude: 'minutely,hourly'
    }).done(function(data) {
        console.log(data);
        weatherBulk = data;
        renderForecast();
        reverseGeocoding();
    })
})

function direction(x) {
    if (x < 22.5 || x > 337.5) {return "North"}
    else if (x > 22.5 && x < 67.5) {return "NorthEast"}
    else if (x > 67.5 && x < 112.5) {return "East"}
    else if (x > 112.5 && x < 157.5) {return "SouthEast"}
    else if (x > 157.5 && x < 202.5) {return "South"}
    else if (x > 202.5 && x < 247.5) {return "SouthWest"}
    else if (x > 247.5 && x < 292.5) {return "West"}
    else if (x > 292.5 && x < 337.5) {return "NorthWest"}
}

function renderForecast() {
    var html
    for (var i = 0; i <= 5; i++) {

        html = '<div class="card">'
        html += '<h5 class="text-center">' + weatherBulk.daily[i].weather[0].main + '</h5>'
        html += '<img src="http://openweathermap.org/img/wn/' + weatherBulk.daily[i].weather[0].icon + '@2x.png" class="card-img-top icon mx-auto">'
        html += '<div class="card-body text-center"> High: ' + weatherBulk.daily[i].temp.max + '°F feels like: ' + weatherBulk.daily[i].feels_like.eve +'°F<br>Low : ' + weatherBulk.daily[i].temp.min + '°F feels like: ' + weatherBulk.daily[i].feels_like.morn +'°F'
        html += '<p class="card-text">Humidity: ' + weatherBulk.daily[i].humidity + '%. <br>' +
            'Winds are ' + weatherBulk.daily[i].wind_speed +' mph from the ' + direction(weatherBulk.daily[i].wind_deg) +'</p>'
        html += '</div>'
        html += '</div>'
        $('#' + i).html(html)
    }
}

$('#search').click(forwardGeocoding())


var locationName

function reverseGeocoding () {
$.get("https://api.mapbox.com/geocoding/v5/mapbox.places/" +lnglat.lng+","+lnglat.lat+".json", {
    access_token: mapBoxToken
}).done(function(data) {
    console.log(data);
    locationName = data;
    $('#forecastlocation').html(data.features[1].place_name);
})
}
var searchResults
function forwardGeocoding () {
    var input = [lnglat.lng, lnglat.lat]
    var html
    $.get("https://api.mapbox.com/geocoding/v5/mapbox.places/" + $('#locationsearch').val() +".json", {
        access_token: mapBoxToken,
        proximity: input,
        limit: 10,
    }).done(function(data) {
        console.log(data);
    searchResults = data
// html += '<select class="form-select" multiple>'
//     for ( var i = 0; i < data.features.length; i++) {
// html += '<option>' + data.features[i].place_name + '</option>'
//     }
// html += '</select>'
//     $('#searchresults').html(html)
// html +=

    })
}
