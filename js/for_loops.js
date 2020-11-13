"use strict'"
function showMultiplicationTables(x) {
    for (var i = 0; i <=10; i++){
        console.log(x + " x " + i + " = " + (i*x));
        // console.log(i*x);
    }
}

for ( var i = 0; i<10 ;i++) {
    var random = Math.floor((Math.random() * 200) + 1);
    if (random %2 == 0) {console.log(random +" is even.")}
    else if (random %2 ==1) {console.log(random + " is odd.")}
    else {console.log("Something strange happened.")}
}

//4 - create a for loop that makes a pyramid of 1, 22, 333

for (var i = 0; i<10; i++) {
console.log(i.toString().repeat(i))
}

for (var i = 20; i>=0; i--) {
    console.log( i * 5);
}



function factorsToTen(x) {
    var i = 0
    while (i < 11) {
        console.log(x * i);
        i++
    }
}