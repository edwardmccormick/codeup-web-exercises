"use strict'"
function showMultiplicationTables(x) {
    for (var i = 1; i <=10; i++){
        console.log(x + " x " + i + " = " + (i*x));
        // console.log(i*x);
    }
}

for ( var i = 0; i<10 ;i++) {
    var random = Math.floor((Math.random() * 200 - 20) + 20);
    if (random %2 == 0) {console.log(random +" is even.")}
    else if (random %2 ==1) {console.log(random + " is odd.")}
    else {console.log("Something strange happened.")}
}

//4 - create a for loop that makes a pyramid of 1, 22, 333

for (var i = 0; i<10; i++) {
console.log(i.toString().repeat(i))
}

for (var outer = 1; outer <= 9; outer++){
var output = '';

    for(var inner = 1; inner <= outer; inner++) {
        output = output + outer;
}
console.log(output);
}


for (var i = 20; i>=1; i--) {
    console.log( i * 5);
}

for (var i = 100; i>=5; i-=5){
    console.log(i);
}

function factorsToTen(x) {
    var i = 0
    while (i < 11) {
        console.log(x * i);
        i++
    }
}