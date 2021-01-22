let allMovies

let editClick

var posterModal = new bootstrap.Modal(document.getElementById('posterModal'), {
    keyboard: false})

function onSuccess(data, status) {

    console.log(data);
    console.log(status);
    allMovies = data;
    $("#add-movie").disabled = false
    $('#target').html(
        function () {
            let html = ""
            for (let i = 0; i < data.length; i++) {
                if(data[i].poster === undefined) {data[i].poster = "img/no_poster.png"}
                html += `<div class="card col-6 col-sm-4 col-md-3 col-lg-2 p-2 m-1">
        <div class="text-center card-top">
        <img class="card-img-top poster ratio ratio-4x3" src="${data[i].poster}"><br>
        <h3 class="card-title">${data[i].title} - 
        <small class="text-muted"> ${data[i].year} </small></h3>
              <img class="card-img-top max-width" src="img/${data[i].rating}stars.jpg">
<!--            <div class="d-flex justify-content-start">-->
<!--            <div class="rating col-12" data-vote="0">-->

<!--          <div class="star hidden">-->
<!--            <span class="full" data-value="0"></span>-->
<!--            <span class="half" data-value="0"></span>-->
<!--          </div>-->
<!--        -->
<!--          <div class="star">-->
<!--        -->
<!--            <span class="full" data-value="1"></span>-->
<!--            <span class="half" data-value="0.5"></span>-->
<!--            <span class="selected"></span>-->
<!--        -->
<!--          </div>-->
<!--        -->
<!--          <div class="star">-->
<!--        -->
<!--            <span class="full" data-value="2"></span>-->
<!--            <span class="half" data-value="1.5"></span>-->
<!--            <span class="selected"></span>-->
<!--        -->
<!--          </div>-->
<!--        -->
<!--          <div class="star">-->
<!--        -->
<!--            <span class="full" data-value="3"></span>-->
<!--            <span class="half" data-value="2.5"></span>-->
<!--            <span class="selected"></span>-->
<!--        -->
<!--          </div>-->
<!--        -->
<!--          <div class="star">-->
<!--        -->
<!--            <span class="full" data-value="4"></span>-->
<!--            <span class="half" data-value="3.5"></span>-->
<!--            <span class="selected"></span>-->
<!--        -->
<!--          </div>-->
<!--        -->
<!--          <div class="star">-->
<!--        -->
<!--            <span class="full" data-value="5"></span>-->
<!--            <span class="half" data-value="4.5"></span>-->
<!--            <span class="selected"></span>-->
<!--        -->
<!--          </div>-->
<!--        -->
<!--          <div class="score">-->
<!--            <span class="score-rating js-score">0</span>-->
<!--            <span>/</span>-->
<!--            <span class="total">5</span>-->
<!--          </div>-->
<!--        </div>-->
<!--        </div>-->
        </div>
        <div class="card-bottom"><div class="card-text"><p class="">${data[i].plot}</p>
 
        <p>Starring: ${data[i].actors}</p>
        <p>Directed by: ${data[i].director}</p>
        </div>
        <div class="d-flex justify-content-around row"><button class="edit btn btn-primary col-5 m-1" id="edit${i}" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button><button class="delete btn btn-primary col-5 m-1" id="delete${data[i].id}">Delete</button></div></div>
        <br>
        </div>`
            }
            return html
        })
    $(".card-bottom").hide()
    $('.card-top').click(function() {
        let thisCardBottom = $(this).next()
        // $(this).parent().toggleClass("col-lg-4").toggleClass("col-lg-2");
        $(".card-bottom").not(thisCardBottom).slideUp(500)
        $(this).next().slideToggle(1000)
    })
    //     .dblclick(function () {
    //     posterModal.show()
    //     let editID =  $(this).next().children().last().children().first().attr("id").toString().slice(4, $(this).next().children().last().children().first().attr("id").toString().length);
    //     $('#modal-edit-title').html("Check out the Movie Poster for " + (allMovies[editID].title).toUpperCase())
    //     $('#posterPoster').html("<img class='col-12' src='" + allMovies[editID].poster + "'>")
    //     // $('#editPosterURL').val(allMovies[editID].poster)
    // })
    $(".delete").click(function (e) {
        e.preventDefault()
        let source = $(this).parent().parent().parent()
        if (confirm("Are you sure you want to delete?")) {
            source.slideToggle(1000)
            fetch("https://ruddy-enchanting-grasshopper.glitch.me/movies/" + $(this)[0].id.toString().slice(6, $(this)[0].id.length), {method: 'DELETE'}).then(function (response) {
                console.log(response);
            })
        } else {
            console.log("Aborted delete");
        }
        // console.log($(this)[0].id.toString().slice(6, $(this)[0].id.length))
        // fetch("https://ruddy-enchanting-grasshopper.glitch.me/movies/" + $(this)[0].id.toString().slice(6, $(this)[0].id.length), {method: 'DELETE'}).then(function (response) {
        //     console.log(response);
        // })
    })
        $(".edit").click(function (e) {
            e.preventDefault()
            console.log($(this)[0].id.toString().slice(4, $(this)[0].id.length))
            let editID = ($(this)[0].id.toString().slice(4, $(this)[0].id.length))
            editClick = $(this)
            $('#modal-edit-title').html("Editing: " + (allMovies[editID].title).toUpperCase())
            $('#editActors').val(allMovies[editID].actors)
            $('#editDirectors').val(allMovies[editID].director)
            $('#editTitle').val(allMovies[editID].title)
            $('#editYear').val(allMovies[editID].year)
            $('#editPlot').val(allMovies[editID].plot)
            $('#editRatingNumber').val(allMovies[editID].rating)
            $('#editID').val(allMovies[editID].id)
            $('#editGenres').val(allMovies[editID].genre)
            $('#editPoster').html("<img class='' src='" + allMovies[editID].poster + "'>")
            $('#editPosterURL').val(allMovies[editID].poster)
    })
    // This code was to implement animated stars - but we didn't quite get to it
    // var starClicked = false;
    //
    // $(function() {
    //
    //     $('.star').click(function() {
    //
    //         $(this).children('.selected').addClass('is-animated');
    //         $(this).children('.selected').addClass('pulse');
    //
    //         var target = this;
    //
    //         setTimeout(function() {
    //             $(target).children('.selected').removeClass('is-animated');
    //             $(target).children('.selected').removeClass('pulse');
    //         }, 1000);
    //
    //         starClicked = true;
    //     })
    //
    //     $('.half').click(function() {
    //         if (starClicked == true) {
    //             setHalfStarState(this)
    //         }
    //         $(this).closest('.rating').find('.js-score').text($(this).data('value'));
    //
    //         $(this).closest('.rating').data('vote', $(this).data('value'));
    //         calculateAverage()
    //         console.log(parseInt($(this).data('value')));
    //
    //     })
    //
    //     $('.full').click(function() {
    //         if (starClicked == true) {
    //             setFullStarState(this)
    //         }
    //         $(this).closest('.rating').find('.js-score').text($(this).data('value'));
    //
    //         $(this).find('js-average').text(parseInt($(this).data('value')));
    //
    //         $(this).closest('.rating').data('vote', $(this).data('value'));
    //         calculateAverage()
    //
    //         console.log(parseInt($(this).data('value')));
    //     })
    //
    //     $('.half').hover(function() {
    //         if (starClicked == false) {
    //             setHalfStarState(this)
    //         }
    //
    //     })
    //
    //     $('.full').hover(function() {
    //         if (starClicked == false) {
    //             setFullStarState(this)
    //         }
    //     })
    //
    // })
    //
    // function updateStarState(target) {
    //     $(target).parent().prevAll().addClass('animate');
    //     $(target).parent().prevAll().children().addClass('star-colour');
    //
    //     $(target).parent().nextAll().removeClass('animate');
    //     $(target).parent().nextAll().children().removeClass('star-colour');
    // }
    //
    // function setHalfStarState(target) {
    //     $(target).addClass('star-colour');
    //     $(target).siblings('.full').removeClass('star-colour');
    //     updateStarState(target)
    // }
    //
    // function setFullStarState(target) {
    //     $(target).addClass('star-colour');
    //     $(target).parent().addClass('animate');
    //     $(target).siblings('.half').addClass('star-colour');
    //
    //     updateStarState(target)
    // }
    //
    // function calculateAverage() {
    //     var average = 0
    //
    //     $('.rating').each(function() {
    //         average += $(this).data('vote')
    //     })
    //
    //     $('.js-average').text((average/ $('.rating').length).toFixed(1))
    // }
}

// const deleteMethod = {
//     method: 'DELETE'
//     }
//
// //
// fetch("https://ruddy-enchanting-grasshopper.glitch.me/movies/" + $(this)[0].id.toString().slice(4,$(this)[0].id.length), {method: 'DELETE'}).then(function (response){
//     console.log(response);


    //console.log(`Hello, ${name.toUpperCase()}!`); // Hello, CODEUP!
    // display the requested data to the user


function onFail(status, error) {
    console.log(status)
    console.log(error)
    // tell the user something went wrong, and to try again later
}

function stopLoadingAnimation() {
    $('.loading').addClass('d-none')// the request is no longer pending, hide the loading spinner
    $('footer').removeClass('d-none')
}

var posterModal = new bootstrap.Modal(document.getElementById('posterModal'))

$(document).ready(function() {
    $("#add-movie").disabled = true
    $.get("https://ruddy-enchanting-grasshopper.glitch.me/movies")
        .done(onSuccess)
        .fail(onFail)
        .always(stopLoadingAnimation);
         $('[data-toggle="tooltip"]').tooltip()






})



// function addMovie() {
// $.post("https://ruddy-enchanting-grasshopper.glitch.me/movies", {
//     title: document.getElementById("movie-title").value,
//     rating: document.getElementById("movie-rating").value,
//     }).done(function(data) {
//         console.log(data);
// })
// }

$("#add-movie").click(function(e) {
    e.preventDefault();
    $('#addID').val(parseInt(allMovies[allMovies.length-1].id)+1)
})

$("#addMovie").click(function(e) {
    e.preventDefault()
    $(this).disabled = true
    let movieObj = {
        actors: $('#addActors').val(),
        director: $('#addDirectors').val(),
        title: $('#addTitle').val(),
        year: $('#addYear').val(),
        plot: $('#addPlot').val(),
        rating: $('#addRatingNumber').val(),
        id: $('#addID').val(),
        genre: $('#addGenres').val(),
        poster: $('#addPosterURL').val(),
    }
    console.log(movieObj);
    $('#addActors').val("")
    $('#addDirectors').val("")
    $('#addTitle').val("")
    $('#addYear').val("")
    $('#addPlot').val("")
    $('#addRatingNumber').val("")
    $('#addID').val("")
    $('#addGenres').val("")
    $('#addPosterURL').val("")
    $('#addsearchResults').children().remove()
    $("#addPoster").html("")
    $.post("https://ruddy-enchanting-grasshopper.glitch.me/movies", movieObj).then(response => {
        console.log(response); $(this).disabled = false;
        allMovies.push(movieObj)
        $("#target").append(function () {
            let html = ""
                if(movieObj.poster === undefined) {movieObj.poster = "img/no_poster.png"}
                html += `<div id="id${movieObj.id}" class="card col-6 col-sm-4 col-md-3 col-lg-2 p-2 my-2">
        <div class="text-center card-top">
        <img class="card-img-top poster ratio ratio-4x3" src="${movieObj.poster}"><br>
        <h3 class="card-title">${movieObj.title.toUpperCase()} - 
        <span class="text-muted"> ${movieObj.year} </span></h3>
                <img class="rating card-img-top" src="img/${movieObj.rating}stars.jpg"> 
        </div>
        <div class="card-bottom"><div class="card-text"><p class="">${movieObj.plot}</p>
 
        <p>Starring: ${movieObj.actors}</p>
        <p>Directed by: ${movieObj.director}</p>
        </div>
        <div class="d-flex justify-content-around row"><button class="edit btn btn-primary col-5 m-1" id="edit${allMovies.length-1}" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button><button class="delete btn btn-primary col-5 m-1" id="delete${movieObj.id}">Delete</button></div></div>
        </div>`

            return html


        })
        $("#target").children().last().children().last().hide()
        $("#target").children().last().children().first().click(function() {
            // $(this).parent().toggleClass("col-4").toggleClass("col-2");
            $(this).next().slideToggle(1000)
        })
        $("#target").children().last().children().last().children().last().children().last().click(function (e) {
                e.preventDefault()
            let source = $(this).parent().parent().parent()
            console.log(source)
                if (confirm("Are you sure you want to delete?")) {
                    source.slideToggle(1000);
                    console.log($(this)[0].id.toString().slice(6, $(this)[0].id.length))
                    fetch("https://ruddy-enchanting-grasshopper.glitch.me/movies/" + $(this)[0].id.toString().slice(6, $(this)[0].id.length), {method: 'DELETE'}).then(function (response) {
                        console.log(response);
                    })
                } else {
                    console.log("Aborted delete");
                }
                // console.log($(this)[0].id.toString().slice(6, $(this)[0].id.length))
                // fetch("https://ruddy-enchanting-grasshopper.glitch.me/movies/" + $(this)[0].id.toString().slice(6, $(this)[0].id.length), {method: 'DELETE'}).then(function (response) {
                //     console.log(response);
                // })
            })
            $(".edit").click(function (e) {
                console.log("I'm firing from the newly created edit button!")
                e.preventDefault()
                console.log($(this)[0].id.toString())
                let editID = ($(this)[0].id.toString().slice(4, $(this)[0].id.length))
                editClick = $(this)
                $('#modal-edit-title').html("Editing: " + (allMovies[editID].title).toUpperCase())
                $('#editActors').val(allMovies[editID].actors)
                $('#editDirectors').val(allMovies[editID].director)
                $('#editTitle').val(allMovies[editID].title)
                $('#editYear').val(allMovies[editID].year)
                $('#editPlot').val(allMovies[editID].plot)
                $('#editRatingNumber').val(allMovies[editID].rating)
                $('#editID').val(allMovies[editID].id)
                $('#editGenres').val(allMovies[editID].genre)
                $('#editPoster').html("<img src='" + allMovies[editID].poster + "'>")
                $('#editPosterURL').val(allMovies[editID].poster)
            })
        var starClicked = false;

        $(function() {

            $('.star').click(function() {

                $(this).children('.selected').addClass('is-animated');
                $(this).children('.selected').addClass('pulse');

                var target = this;

                setTimeout(function() {
                    $(target).children('.selected').removeClass('is-animated');
                    $(target).children('.selected').removeClass('pulse');
                }, 1000);

                starClicked = true;
            })

            $('.half').click(function() {
                if (starClicked == true) {
                    setHalfStarState(this)
                }
                $(this).closest('.rating').find('.js-score').text($(this).data('value'));

                $(this).closest('.rating').data('vote', $(this).data('value'));
                calculateAverage()
                console.log(parseInt($(this).data('value')));

            })

            $('.full').click(function() {
                if (starClicked == true) {
                    setFullStarState(this)
                }
                $(this).closest('.rating').find('.js-score').text($(this).data('value'));

                $(this).find('js-average').text(parseInt($(this).data('value')));

                $(this).closest('.rating').data('vote', $(this).data('value'));
                calculateAverage()

                console.log(parseInt($(this).data('value')));
            })

            $('.half').hover(function() {
                if (starClicked == false) {
                    setHalfStarState(this)
                }

            })

            $('.full').hover(function() {
                if (starClicked == false) {
                    setFullStarState(this)
                }
            })

        })

        function updateStarState(target) {
            $(target).parent().prevAll().addClass('animate');
            $(target).parent().prevAll().children().addClass('star-colour');

            $(target).parent().nextAll().removeClass('animate');
            $(target).parent().nextAll().children().removeClass('star-colour');
        }

        function setHalfStarState(target) {
            $(target).addClass('star-colour');
            $(target).siblings('.full').removeClass('star-colour');
            updateStarState(target)
        }

        function setFullStarState(target) {
            $(target).addClass('star-colour');
            $(target).parent().addClass('animate');
            $(target).siblings('.half').addClass('star-colour');

            updateStarState(target)
        }

        function calculateAverage() {
            var average = 0

            $('.rating').each(function() {
                average += $(this).data('vote')
            })

            $('.js-average').text((average/ $('.rating').length).toFixed(1))
        }
    })
    $("#appendTrailersAdd").children().remove();
    })


$('#saveChanges').click(function(e) {
    e.preventDefault();
    console.log("I'm firing from save change");
    $("#searchResults").children().remove()
    let movieObj = {
    actors: $('#editActors').val(),
    director: $('#editDirectors').val(),
    title: $('#editTitle').val(),
    year: $('#editYear').val(),
    plot: $('#editPlot').val(),
    rating: $('#editRatingNumber').val(),
    id: $('#editID').val(),
    genre: $('#editGenres').val(),
    poster: $('#editPosterURL').val()
    }
    $(this).disabled = true
    let topOfCard = editClick.parent().parent().parent()
    editClick.parent().parent().parent().html(function() {
        let html = ""

            if(movieObj.poster === undefined) {movieObj.poster = "img/no_poster.png"}
            html += `
        <div class="text-center card-top">
        <img class="card-img-top poster ratio ratio-4x3" src="${movieObj.poster}"><br>
        <h3 class="card-title">${movieObj.title} - 
        <small class="text-muted"> ${movieObj.year} </small></h3>
                <img class="max-width card-img-top" src="img/${movieObj.rating}stars.jpg"> 
        </div>
        <div class="card-bottom"><div class="card-text"><p class="">${movieObj.plot}</p>
 
        <p>Starring: ${movieObj.actors}</p>
        <p>Directed by: ${movieObj.director}</p>
        </div>
        <div class="d-flex justify-content-around row">${editClick.parent().html()}</div></div>
        </div>`
        return html
    })
    // topOfCard.children().first().next().hide() This is copied from above but I don't *really* want to hide what I just changed, do I?
    topOfCard.children().first().click(function() {
        let thisCardBottom = $(this).next()
        // $(this).parent().toggleClass("col-4").toggleClass("col-2");
        $(".card-bottom").not(thisCardBottom).slideUp(500)
        $(this).next().slideToggle(1000)
    })
    topOfCard.children().last().children().children().first().click(function (e) {
        console.log("I'm firing from the newly created edit button!")
        e.preventDefault()
        console.log($(this)[0].id.toString())
        let editID = ($(this)[0].id.toString().slice(4, $(this)[0].id.length))
        editClick = $(this)
        $('#modal-edit-title').html("Editing: " + (allMovies[editID].title).toUpperCase())
        $('#editActors').val(allMovies[editID].actors)
        $('#editDirectors').val(allMovies[editID].director)
        $('#editTitle').val(allMovies[editID].title)
        $('#editYear').val(allMovies[editID].year)
        $('#editPlot').val(allMovies[editID].plot)
        $('#editRatingNumber').val(allMovies[editID].rating)
        $('#editID').val(allMovies[editID].id)
        $('#editGenres').val(allMovies[editID].genre)
        $('#editPoster').html("<img src='" + allMovies[editID].poster + "'>")
        $('#editPosterURL').val(allMovies[editID].poster)
    })
    topOfCard.children().last().children().children().last().click(function (e) {
        e.preventDefault()
        let source = $(this).parent().parent().parent()
        if (confirm("Are you sure you want to delete?")) {
            source.slideToggle(1000)
            fetch("https://ruddy-enchanting-grasshopper.glitch.me/movies/" + $(this)[0].id.toString().slice(6, $(this)[0].id.length), {method: 'DELETE'}).then(function (response) {
                console.log(response);
            })
        } else {
            console.log("Aborted delete");
        }
    })
    fetch("https://ruddy-enchanting-grasshopper.glitch.me/movies/" + $('#editID').val(), {method: 'PATCH', headers: {'Content-Type': 'application/json',}, body: JSON.stringify(movieObj),}).then(response => {
        console.log(response)
        $(this).disabled = false
    }).catch(error => console.log(error))
})

$("#editClose").click(
    function() {
    $("#searchResults").children().remove()
    $("#appendTrailers").children().remove()
})

$("#addClose").click(function() {
    console.log($(this))
    $("#addsearchResults").children().remove();
    $("#appendTrailersAdd").children().remove();
})

$("#previewEditPoster").click(function () {
    $("#editPoster").html("<img src='" + $("#editPosterURL").val() + "'>")
})

$("#previewAddPoster").click(function () {
    $("#addPoster").html("<img class='card-img-top' src='" + $("#addPosterURL").val() + "'>")
    console.log("Firing from the poster button!")
})

$("#editCloseTop").click(function () {
    $("#searchResults").children().remove()
    $("#appendTrailers").children().remove()
})

$("#addCloseTop").click(function () {
    $("#addsearchResults").children().remove()
    $("#appendTrailersAdd").children().remove();
})

// let searchResults
// let movieDetails
// let movieCastandCrew

$("#editCheckOMDB").click(function() {
    $("#searchResults").children().remove()
fetch("https://api.themoviedb.org/3/search/movie?api_key=" + omdbV3key +"&language=en-US&query=" + $("#editTitle").val() + "&page=1&include_adult=false&year=" + $("#editYear").val()).then(data => data.json()).then(data => {

    console.log(data);
    console.log(status);
    searchResults = data;
    if (data.results.length < 1) {
        $("#searchResults").append("<div><h4>Sorry, there were no matches. If you searched using a year, try removing it, or try a different title.</h4></div>")}
    for (let i =0; i < data.results.length; i++) {
        $("#searchResults").append("<div id=" + data.results[i].id + ">"+ data.results[i].release_date.toString().slice(0,4) + " <img class='' src='https://image.tmdb.org/t/p/w92" + data.results[i].poster_path + "'> " + data.results[i].original_title + "</div>")
    }
    $("#searchResults").children().click(function() {
        console.log($(this).attr("id"))
        fetch("https://api.themoviedb.org/3/movie/" + $(this).attr("id") + "?api_key=" + omdbV3key + "&language=en-US").then(data => data.json()).then(data => {
            console.log(data)
            movieDetails = data
            $("#appendTrailers").children().remove()
            $("#editGenres").val(function() {
                genres = []
                for (let i = 0; i < data.genres.length; i++) {
                    genres.push(data.genres[i].name)
                }
                return genres
            })
            $("#editTitle").val(data.title)
            $("#editPlot").val(data.overview)
            $("#editPosterURL").val("https://image.tmdb.org/t/p/w300" + data.poster_path)
            $("#editPoster").html("<img src='" + $("#editPosterURL").val() + "'>");
            $("#editYear").val(data.release_date.toString().slice(0,4))
    })

        fetch("https://api.themoviedb.org/3/movie/" + $(this).attr("id") + "/credits?api_key=" + omdbV3key + "&language=en-US").then(data => data.json()).then(data => {
            console.log(data);
            movieCastandCrew = data;
            $("#editActors").val(function() {
                actors = []
                for (let i = 0; i < 5; i++) {
                    actors.push(data.cast[i].name); console.log(i)
                }
                return actors
                console.log("The actors I found for this movie are: " + actors)
            });
            $("#editDirectors").val(function() {
                directors = []
                for (let i = 0; i < 50; i++) {
                    if (data.crew[i].job == "Director") {
                        directors.push(data.crew[i].name); break
                    }
                    else {console.log(i)}}
                    return directors
                    console.log("The directors I found for this movie are: " + directors)
                })
            }).catch(error => console.log(error))

            getVideos($(this).attr("id"),$("#appendTrailers"))
            })
}).catch(error => console.log(error))


})

$("#addCheckOMDB").click(function() {
    $("#addsearchResults").children().remove();

    fetch("https://api.themoviedb.org/3/search/movie?api_key=" + omdbV3key +"&language=en-US&query=" + $("#addTitle").val() + "&page=1&include_adult=false&year=" + $("#addYear").val()).then(data => data.json()).then(data => {

        console.log(data);
        console.log(status);
        // searchResults = data;
        if (data.results.length < 1) {
            $("#addsearchResults").append("<div><h4>Sorry, there were no matches. If you searched using a year, try removing it, or try a different title.</h4></div>")}
        for (let i =0; i < data.results.length; i++) {
            let release_date
            function checkReleaseDate() {
                if (data.results[i].release_date === undefined) { release_date = "Future Project"} else {release_date = data.results[i].release_date.toString().slice(0,4)}}
                checkReleaseDate()
            $("#addsearchResults").append("<div id=" + data.results[i].id + ">"+ release_date + " <img src='https://image.tmdb.org/t/p/w92" + data.results[i].poster_path + "'> " + data.results[i].original_title + "</div>")
        }
        $("#addsearchResults").children().click(function() {
            console.log($(this).attr("id"))
            fetch("https://api.themoviedb.org/3/movie/" + $(this).attr("id") + "?api_key=" + omdbV3key + "&language=en-US").then(data => data.json()).then(data => {
                console.log(data)
                movieDetails = data
                $("#addGenres").val(function() {
                    genres = []
                    for (let i = 0; i < data.genres.length; i++) {
                        genres.push(data.genres[i].name)
                    }
                    return genres
                })
                $("#addTitle").val(data.title)
                $("#addPlot").val(data.overview)
                $("#addPosterURL").val("https://image.tmdb.org/t/p/w300" + data.poster_path)
                $("#addPoster").html("<img class='' src='" + $("#addPosterURL").val() + "'>");
                $("#addYear").val(data.release_date.toString().slice(0,4))
            }).catch(error => console.log(error))

            $("#appendTrailersAdd").children().remove();

            fetch("https://api.themoviedb.org/3/movie/" + $(this).attr("id") + "/credits?api_key=" + omdbV3key + "&language=en-US").then(data => data.json()).then(data => {
                console.log(data);
                // movieCastandCrew = data;
                $("#addActors").val(function() {
                    actors = []
                    for (let i = 0; i < 5; i++) {
                        actors.push(data.cast[i].name); console.log(i)
                    }
                    return actors
                    console.log("The actors I found for this movie are: " + actors)
                });
                $("#addDirectors").val(function() {
                    directors = []
                    for (let i = 0; i < 50; i++) {
                        if (data.crew[i].job == "Director") {
                            directors.push(data.crew[i].name); break
                        }
                        else {console.log(i)}}
                    return directors
                    console.log("The directors I found for this movie are: " + directors)
                })
            })
            $("#appendTrailersAdd").children().remove()
            getVideos($(this).attr("id"),$("#appendTrailersAdd"))

        })
    })


})

    // https://api.themoviedb.org/3/movie/272?api_key=api-key&language=en-US

    // https://api.themoviedb.org/3/movie/<movie id>/credits?api_key=ba6d2ad3567702f5ab135da63fe57a78&language=en-US

// https://api.themoviedb.org/3/movie/<movie ID>/images?api_key=<api key>&language=en-US
let movieTrailers

function getVideos(movieID,appendTo) {
    fetch("https://api.themoviedb.org/3/movie/" + movieID + "/videos?api_key=" + omdbV3key + "&language=en-US").then(data => data.json()).then(data => {
        console.log(data);
        console.log("I'm firing from the getVideos function");
        movieTrailers = data;
        if (data.results.length < 1) {
        appendTo.append("<div><h4>Sorry, there were no movie trailers available for this title.</h4></div>")}
        appendTo.append("<div><h4>The following trailers were found for this title:</h4></div>")
        for (let i =0; i < data.results.length; i++) {
            appendTo.append("<div id='" + data.results[i].key + "'>"+ data.results[i].name +  "</div>")
        }
        appendTo.append("<div></div>")
        // let key = $(this).attr("id")
        appendTo.children().click(function() {
            console.log($(this).attr("id"))
            // console.log(key)
        appendTo.children().last().remove()
        appendTo.append('<div class="col-12 ratio ratio-16x9"><iframe class="" src="https://www.youtube.com/embed/'+ $(this).attr("id") + '" allowfullscreen></iframe></div>')
        })
    })
}

// var starClicked = false;
//
// $(function() {
//
//     $('.star').click(function() {
//
//         $(this).children('.selected').addClass('is-animated');
//         $(this).children('.selected').addClass('pulse');
//
//         var target = this;
//
//         setTimeout(function() {
//             $(target).children('.selected').removeClass('is-animated');
//             $(target).children('.selected').removeClass('pulse');
//         }, 1000);
//
//         starClicked = true;
//     })
//
//     $('.half').click(function() {
//         if (starClicked == true) {
//             setHalfStarState(this)
//         }
//         $(this).closest('.rating').find('.js-score').text($(this).data('value'));
//
//         $(this).closest('.rating').data('vote', $(this).data('value'));
//         calculateAverage()
//         console.log(parseInt($(this).data('value')));
//
//     })
//
//     $('.full').click(function() {
//         if (starClicked == true) {
//             setFullStarState(this)
//         }
//         $(this).closest('.rating').find('.js-score').text($(this).data('value'));
//
//         $(this).find('js-average').text(parseInt($(this).data('value')));
//
//         $(this).closest('.rating').data('vote', $(this).data('value'));
//         calculateAverage()
//
//         console.log(parseInt($(this).data('value')));
//     })
//
//     $('.half').hover(function() {
//         if (starClicked == false) {
//             setHalfStarState(this)
//         }
//
//     })
//
//     $('.full').hover(function() {
//         if (starClicked == false) {
//             setFullStarState(this)
//         }
//     })
//
// })
//
// function updateStarState(target) {
//     $(target).parent().prevAll().addClass('animate');
//     $(target).parent().prevAll().children().addClass('star-colour');
//
//     $(target).parent().nextAll().removeClass('animate');
//     $(target).parent().nextAll().children().removeClass('star-colour');
// }
//
// function setHalfStarState(target) {
//     $(target).addClass('star-colour');
//     $(target).siblings('.full').removeClass('star-colour');
//     updateStarState(target)
// }
//
// function setFullStarState(target) {
//     $(target).addClass('star-colour');
//     $(target).parent().addClass('animate');
//     $(target).siblings('.half').addClass('star-colour');
//
//     updateStarState(target)
// }
//
// function calculateAverage() {
//     var average = 0
//
//     $('.rating').each(function() {
//         average += $(this).data('vote')
//     })
//
//     $('.js-average').text((average/ $('.rating').length).toFixed(1))
// }