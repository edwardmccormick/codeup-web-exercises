"use strict";

mapboxgl.accessToken = mapBoxToken; // from keys.js file

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/navigation-preview-night-v4',
    center: [-98.4916, 29.4252],
    zoom: 11,
});
//starting location, and it also happens to be the global variable for passing lat/longs back and forth between the APIs
var lnglat = {lat:29.4252, lng:-98.4916}

var marker = new mapboxgl.Marker({
        draggable: true,
        color: '#ec6e4c'
    })
    .setLngLat([lnglat.lng, lnglat.lat])
    .addTo(map);

var markerSearch

var weatherBulk

//the actual function that runs once the marker drag is done

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
        weatherBulk = data;
        renderForecast();
        reverseGeocoding();
    })
}
//call the function once in order to populate all the fields on page load
onDragEnd()
// drag functionality
marker.on('dragend', onDragEnd);

var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    marker: {
        draggable: true,
        color: '#ec6e4c',
    }
})

//On document load, get the weather data for our starting location, San Antonio.

$(document).ready(function() {
    // Ajax call to OpenWeatherAPI
    $.get("https://api.openweathermap.org/data/2.5/onecall", {
        APPID: OPEN_WEATHER_APPID,
        lat: lnglat.lat,
        lon: lnglat.lng,
        units: 'imperial',
        exclude: 'minutely,hourly'
    }).done(function(data) {
        weatherBulk = data;
        renderForecast();
        reverseGeocoding();
    })
})
// To interpolate wind data
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

//What it says on the box - is it today or tomorrow?
function todayOrTomorrow(x) {
    if (x == 0 ) {return "Today"}
    if (x == 1) {return "Tomorrow"}
    else {return ""}
}

//This parses the weather data in order to create the forecast cards in the Divs at the top. There's a funny story about how the divs are name and I lost today

function renderForecast() {
    var html
    for (var i = 0; i <= 6; i++) {
    var date = new Date(weatherBulk.daily[i].dt * 1000).toDateString().slice(0,10)
    var today = todayOrTomorrow(i)
        html = '<div class="card ">'
        html += '<h5 class="text-center">' + today + '<br>'
        html += ''+ date + '<br>' + weatherBulk.daily[i].weather[0].main + '</h5>'
        html += '<img src="http://openweathermap.org/img/wn/' + weatherBulk.daily[i].weather[0].icon + '@2x.png" class="card-img-top icon mx-auto">'
        html += '<div class="card-body text-center">High: <span class="high"><strong>' + weatherBulk.daily[i].temp.max + '°F</strong></span> feels like: ' + weatherBulk.daily[i].feels_like.eve +'°F<br>Low: <span class="low"><strong>' + weatherBulk.daily[i].temp.min + '°F</strong></span> feels like: ' + weatherBulk.daily[i].feels_like.morn +'°F'
        html += '<p class="card-text">Humidity: ' + weatherBulk.daily[i].humidity + '%. <br>' +
            'Winds are ' + weatherBulk.daily[i].wind_speed +' mph from the ' + direction(weatherBulk.daily[i].wind_deg) +'</p>'
        html += '</div>'
        html += '</div>'
        $('#' + i).html(html)
    }
}
//When you click the search button - it takes you to the top result according to Mapbox
$('#search').click(function(e) {
    e.preventDefault();
    forwardGeocoding();
})

//It also does it if you hit enter in the search bar.
$('#locationsearch').keypress(function(e) {
    if(e.keyCode == 13) {
    forwardGeocoding();
    }
    // console.log(e)
//    This is to catch the keycode
})


//This function populates the latitude display and interpolates it as North or South
function latDisplay() {
    if (lnglat.lat < 0) {document.getElementById('latitudedisplay').value = -lnglat.lat + "°N"}
    else {document.getElementById('latitudedisplay').value = lnglat.lat + "°N"}
}
//This function populates the longitudue display and interpolates it as East or West
function longDisplay() {
    if (lnglat.lng < 0) {$('#longitudedisplay').val(-lnglat.lng + "°W")}
    else ($('#longitudedisplay').val(lnglat.lng + "°E"))
}

var locationName


//I use this function a LOT - it populates the location listed at the top of the page, so it gets called in quite a few other functions as an afterthought (i.e. basically any time the map or forecast move)
function reverseGeocoding () {
$.get("https://api.mapbox.com/geocoding/v5/mapbox.places/" +lnglat.lng+","+lnglat.lat+".json", {
    access_token: mapBoxToken
}).done(function(data) {
    locationName = data;
    $('#forecastlocation').html(data.features[1].place_name);
})
}
var searchResults


//This is a search function with the mapbox API, but it pushes to only the top return.
function forwardGeocoding () {
    var input = [lnglat.lng, lnglat.lat]
    var html
    $.get("https://api.mapbox.com/geocoding/v5/mapbox.places/" + $('#locationsearch').val() +".json", {
        access_token: mapBoxToken,
        proximity: input,
        limit: 10,
    }).done(function(data) {
//This was part of an aborted attempt to build the reversegeocode into the regular geocode
//             searchResults = data
// html += '<select class="form-select" multiple>'
//     for ( var i = 0; i < data.features.length; i++) {
// html += '<option>' + data.features[i].place_name + '</option>'
//     }
// html += '</select>'
//     $('#searchresults').html(html)
// html +=
//        below populates the global lnglat variable to communicate between the APIs
lnglat.lng = data.features[0].center[0]
lnglat.lat = data.features[0].center[1]
        //THis pushes the marker to the new location
        marker.setLngLat([lnglat.lng, lnglat.lat])
        //This centers the map
        map.flyTo({center: [lnglat.lng, lnglat.lat]})
        $.get("https://api.openweathermap.org/data/2.5/onecall", {
            APPID: OPEN_WEATHER_APPID,
            lat: lnglat.lat,
            lon: lnglat.lng,
            units: 'imperial',
            exclude: 'minutely,hourly'
        }).done(function(data) {
            //Calls the weather data, renders a new forecast, reverseGeocodes where we landed
            weatherBulk = data;
            renderForecast();
            reverseGeocoding();
        })
//        Updates the Lat/Long blanks to the new location
latDisplay();
    longDisplay();
    })
}
//This is the driving factor in allowing me to have an autocomplete search. It calls a function to search the API, then displayes the results in a div underneath the search bar.
$('#locationsearch').keydown(function () {
    if ($('#locationsearch').val().length > 2) {
        var html = ""
        searchReturn();
        // $('searchtarget').toggleClass(col-lg-1, col-lg-2);
        // $('htarget').toggleClass(col-lg-1, d-none);
        // html = '<ul className="list-group list-group-flush m-0">'
        for (var i = 0; i < searchResults.length; i++) {
            $("#search" + i).text(searchResults[i]).removeClass("d-none")
        }
        // html += '</ul>'
        // $('#searchtarget').html(html)
    } else {
        $('#searchdiv').children().addClass('d-none')
    }
})

//This keeps the page mostly responsive, but lines up the Divs a little better
$('#locationsearch').focus(function () {
    $('.blank').removeClass('col-lg-1')
    $('#accordian').addClass('d-none')
    $('#searchdiv').addClass('col-lg-2')
})

$('#locationsearch, #searchdiv').focusout(function () {
    $('.blank').addClass('col-lg-1')
    $('#accordian').removeClass('d-none')
    $('#searchdiv').removeClass('col-lg-2')
})
// this worked pretty well, but messed with the 'click' function below, so I had to scrap it.
//     .focusout(function () {
//     $('.blank').addClass('col-lg-1')
//     $('#accordian').removeClass('d-none')
//     $('#searchdiv').removeClass('col-lg-2')
// })


//This function drives the 'click' on the homebrewed autocomplete search
$('#searchdiv').children().click(function() {
    var input = [lnglat.lng, lnglat.lat]
    var number = $(this).attr('id').toString().slice(6,7)
    $.get("https://api.mapbox.com/geocoding/v5/mapbox.places/" + $('#locationsearch').val() +".json", {
        access_token: mapBoxToken,
        proximity: input,
        limit: 5,
    }).done(function(data) {
lnglat.lng = data.features[parseInt(number)].center[0]
lnglat.lat = data.features[parseInt(number)].center[1]

marker.setLngLat([lnglat.lng, lnglat.lat])

map.flyTo({center: [lnglat.lng, lnglat.lat]})
$.get("https://api.openweathermap.org/data/2.5/onecall", {
    APPID: OPEN_WEATHER_APPID,
    lat: lnglat.lat,
    lon: lnglat.lng,
    units: 'imperial',
    exclude: 'minutely,hourly'
}).done(function(data) {
    weatherBulk = data;
    renderForecast();
    reverseGeocoding();
})
latDisplay();
longDisplay();
})

    $('#searchdiv').children().addClass('d-none')

})





// $('#locationsearch').keypress(searchReturn())

// $('locationsearch').keydown(function (e) {
//     console.log(e + "I'm firing from keydown and that was the event");San
// })


//This function searches the Mapbox API and parses a return string for display in the autocomplete search options
function searchReturn () {
    var input = [lnglat.lng, lnglat.lat]
    var html
    $.get("https://api.mapbox.com/geocoding/v5/mapbox.places/" + $('#locationsearch').val() +".json", {
        access_token: mapBoxToken,
        proximity: input,
    }).done(function(data) {
        searchResults = []
    for (var i = 0 ; i< data.features.length; i++) {searchResults.push(data.features[i].place_name)}
    })
}





//Props to Kenneth Howell - this is beautiful but not quite perfect
geocoder.on('result', function(e) {
    console.log(e.result.center);
    geocoder.clear();
    var marker2 = new mapboxgl.Marker({ draggable: true, color: "#ec6e4c" })
        .setLngLat(e.result.center)
        .addTo(map)
    lnglat = {lat: e.result.center[1], lng: e.result.center[0]};
    latDisplay();
    longDisplay();
    $.get("https://api.openweathermap.org/data/2.5/onecall", {
        APPID: OPEN_WEATHER_APPID,
        lat: lnglat.lat,
        lon: lnglat.lng,
        units: 'imperial',
        exclude: 'minutely,hourly'
    }).done(function(data) {

        weatherBulk = data;
        renderForecast();
        reverseGeocoding();
    })
    // marker2 = markerSearch
})

//10 markerSearch.on('dragend', onDragEnd); mostly because this never worked on reading the second marker.

//This puts the geocoder on the page.
// document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

// function geocode(search, token) {
//     var baseUrl = 'https://api.mapbox.com';
//     var endPoint = '/geocoding/v5/mapbox.places/';
//     return fetch(baseUrl + endPoint + encodeURIComponent(search) + '.json' + "?" + 'access_token=' + token)
//         .then(function(res) {
//             return res.json();
//             // to get all the data from the request, comment out the following three lines...
//         }).then(function(data) {
//             return data.features[0].center;
//         });
// }


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