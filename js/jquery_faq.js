"use strict";

$('.answer, ul').hide(0);


$('document').ready(function() {
$('#visibilitytoggle').click(function(e) {
    e.preventDefault();
    $('dd').slideToggle(1000);
    $('ul').slideToggle(1000);
})
$('dt').click(function() {
    $(this).toggleClass('highlight');

})
$('.1, .2, .3, .4, .5, .6').click(function() {
    $('+ .answer', this).slideToggle(1000)
})

$('#highlightbutton').click(function (e){
    e.preventDefault()
    $('ul').each(function() {
    $(this).children().last().toggleClass('highlight');
    })

})

$('h3').click(function() {
    $(this).next().children().toggleClass('bold');

})

$('li').click(function() {
    $(this).parent().children().first().toggleClass('blue');

})
    $('#close').click(function() {
    $(this).parent().parent().slideUp(1000)
})

$('h3').click(function() {
    $(this).next().slideToggle(1000)
})

$('h2').delay(8000).fadeIn(1000)

$('.pictureButton').click(function() {
    if ($(this).parent().hasClass("left")) {
        $(this).parent().toggleClass('left middle');
        $(this).parent().next().toggleClass('left middle')
    }
    if ($(this).parent().hasClass('right')) {
        $(this).parent().toggleClass('right middle')
        $(this).parent().prev().toggleClass('right middle')
        console.log("The right side is registering!")
    }

    })

})