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
    latDisplay();
    longDisplay();
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

function todayOrTomorrow(x) {
    if (x == 0 ) {return "Today"}
    if (x == 1) {return "Tomorrow"}
    else {return ""}
}

function renderForecast() {
    var html
    for (var i = 0; i <= 6; i++) {
        console.log(i)
    var date = new Date(weatherBulk.daily[i].dt * 1000).toDateString().slice(0,10)
    var today = todayOrTomorrow(i)
        html = '<div class="card">'
        html += '<h5 class="text-center">' + today + '<br>'
        html += ''+ date + '<br>' + weatherBulk.daily[i].weather[0].main + '</h5>'
        html += '<img src="http://openweathermap.org/img/wn/' + weatherBulk.daily[i].weather[0].icon + '@2x.png" class="card-img-top icon mx-auto">'
        html += '<div class="card-body text-center"> High: ' + weatherBulk.daily[i].temp.max + '°F feels like: ' + weatherBulk.daily[i].feels_like.eve +'°F<br>Low : ' + weatherBulk.daily[i].temp.min + '°F feels like: ' + weatherBulk.daily[i].feels_like.morn +'°F'
        html += '<p class="card-text">Humidity: ' + weatherBulk.daily[i].humidity + '%. <br>' +
            'Winds are ' + weatherBulk.daily[i].wind_speed +' mph from the ' + direction(weatherBulk.daily[i].wind_deg) +'</p>'
        html += '</div>'
        html += '</div>'
        $('#' + i).html(html)
    }
}

$('#search').click(function(e) {
    e.preventDefault();
    forwardGeocoding();
    console.log("click is working!")
})

$('#locationsearch').keypress(function(e) {
    if(e.keyCode == 13) {
    forwardGeocoding();
    }
    // console.log(e)
//    This is to catch the keycode
})

function latDisplay() {
    if (lnglat.lat < 0) {document.getElementById('latitudedisplay').value = -lnglat.lat + "°N"}
    else {document.getElementById('latitudedisplay').value = lnglat.lat + "°N"}
}

function longDisplay() {
    if (lnglat.lng < 0) {$('#longitudedisplay').val(-lnglat.lng + "°W")}
    else ($('#longitudedisplay').val(lnglat.lng + "°E"))
}

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
lnglat.lng = data.features[0].center[0]
lnglat.lat = data.features[0].center[1]

        marker.setLngLat([lnglat.lng, lnglat.lat])

        map.flyTo({center: [lnglat.lng, lnglat.lat]})
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
latDisplay();
    longDisplay();
    })
}

// $('#locationsearch').keypress(searchReturn())

// $('locationsearch').keydown(function (e) {
//     console.log(e + "I'm firing from keydown and that was the event");San
// })

function searchReturn () {
    var input = [lnglat.lng, lnglat.lat]
    var html
    $.get("https://api.mapbox.com/geocoding/v5/mapbox.places/" + $('#locationsearch').val() +".json", {
        access_token: mapBoxToken,
        proximity: input,
        limit: 5,
    }).done(function(data) {
        searchResults = []
    for (var i = 0 ; i< data.features.length; i++) {searchResults.push(data.features[i].place_name)}
    })
}

// var geocoder = new MapboxGeocoder({
//     accessToken: mapboxgl.accessToken,
//     mapboxgl: mapboxgl
// });
//
// document.getElementById('geocoder').appendChild(geocoder.onAdd(map));


//
// function autocomplete(inp, arr) {
//     /*the autocomplete function takes two arguments,
//     the text field element and an array of possible autocompleted values:*/
//     var currentFocus;
//     /*execute a function when someone writes in the text field:*/
//     inp.addEventListener("input", function(e) {
//         var a, b, i, val = this.value;
//         /*close any already open lists of autocompleted values*/
//         closeAllLists();
//         if (!val) { return false;}
//         currentFocus = -1;
//         /*create a DIV element that will contain the items (values):*/
//         a = document.createElement("DIV");
//         a.setAttribute("id", this.id + "autocomplete-list");
//         a.setAttribute("class", "autocomplete-items");
//         /*append the DIV element as a child of the autocomplete container:*/
//         this.parentNode.appendChild(a);
//         /*for each item in the array...*/
//         for (i = 0; i < arr.length; i++) {
//             /*check if the item starts with the same letters as the text field value:*/
//             if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
//                 /*create a DIV element for each matching element:*/
//                 b = document.createElement("DIV");
//                 /*make the matching letters bold:*/
//                 b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
//                 b.innerHTML += arr[i].substr(val.length);
//                 /*insert a input field that will hold the current array item's value:*/
//                 b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
//                 /*execute a function when someone clicks on the item value (DIV element):*/
//                 b.addEventListener("click", function(e) {
//                     /*insert the value for the autocomplete text field:*/
//                     inp.value = this.getElementsByTagName("input")[0].value;
//                     /*close the list of autocompleted values,
//                     (or any other open lists of autocompleted values:*/
//                     closeAllLists();
//                 });
//                 a.appendChild(b);
//             }
//         }
//     });
//     /*execute a function presses a key on the keyboard:*/
//     inp.addEventListener("keydown", function(e) {
//         var x = document.getElementById(this.id + "autocomplete-list");
//         if (x) x = x.getElementsByTagName("div");
//         if (e.keyCode == 40) {
//             /*If the arrow DOWN key is pressed,
//             increase the currentFocus variable:*/
//             currentFocus++;
//             /*and and make the current item more visible:*/
//             addActive(x);
//         } else if (e.keyCode == 38) { //up
//             /*If the arrow UP key is pressed,
//             decrease the currentFocus variable:*/
//             currentFocus--;
//             /*and and make the current item more visible:*/
//             addActive(x);
//         } else if (e.keyCode == 13) {
//             /*If the ENTER key is pressed, prevent the form from being submitted,*/
//             e.preventDefault();
//             if (currentFocus > -1) {
//                 /*and simulate a click on the "active" item:*/
//                 if (x) x[currentFocus].click();
//             }
//         }
//     });
//     function addActive(x) {
//         /*a function to classify an item as "active":*/
//         if (!x) return false;
//         /*start by removing the "active" class on all items:*/
//         removeActive(x);
//         if (currentFocus >= x.length) currentFocus = 0;
//         if (currentFocus < 0) currentFocus = (x.length - 1);
//         /*add class "autocomplete-active":*/
//         x[currentFocus].classList.add("autocomplete-active");
//     }
//     function removeActive(x) {
//         /*a function to remove the "active" class from all autocomplete items:*/
//         for (var i = 0; i < x.length; i++) {
//             x[i].classList.remove("autocomplete-active");
//         }
//     }
//     function closeAllLists(elmnt) {
//         /*close all autocomplete lists in the document,
//         except the one passed as an argument:*/
//         var x = document.getElementsByClassName("autocomplete-items");
//         for (var i = 0; i < x.length; i++) {
//             if (elmnt != x[i] && elmnt != inp) {
//                 x[i].parentNode.removeChild(x[i]);
//             }
//         }
//     }
//     /*execute a function when someone clicks in the document:*/
//     document.addEventListener("click", function (e) {
//         closeAllLists(e.target);
//     });
// }
//
// autocomplete(document.getElementById('locationsearch'), searchResults)