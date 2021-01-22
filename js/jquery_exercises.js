$('h1').hover(
    // function() {
    //     console.log("Here it is!")
    // })
    function() {
        $(this).css('background-color', 'blue')
    },
    function() {
        $(this).css('background-color', 'white')
    }
)

// $('h1').click(css('background-color', 'blue')

$('p').dblclick(function() {
    $(this).css('font-size', '18px')
})

$('*').hover(
    // function() {
    //     console.log("Here it is!")
    // })
    function() {
        $(this).css('color', 'red')
    },
    function() {
        $(this).css('color', 'black')
    }
)
var fourthBestSeller = "<li>Cyberpunk hats! So hot right now</li>"
$(document).keydown(function(e) {
    console.log(e.key);
})

$("body").on("click", "li", function() {
$("ol").append(fourthBestSeller);
$("body").off("click");
});

// $("ol").on("hover", function() {
//     $("ol").css('background-color','black')},
//     function () {
//     $("ol").css('background-color','white')
//     })

