var i = 2
while (i < 70000) {
    console.log(i)
    i *= 2
}

var allCones = Math.floor(Math.random() *50)+50;


// var allCones = 5

do {var buy = Math.floor(Math.random()*5)+1;
    if (allCones >= buy) {allCones -= buy ;console.log(buy + " cones sold...")}
    else if (allCones < buy) {console.log("Cannot sell you " + buy + " cones I only have " + allCones + "....")}
    else (console.log("Something strange happened."))
    if (allCones === 0) {console.log("Yay! I sold them all!")}
} while (allCones > 0)