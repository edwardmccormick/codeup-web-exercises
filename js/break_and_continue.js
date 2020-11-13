var skipNumber = prompt("Please enter an odd number between 1 and 50")

while (!isNan(skipNumber) || %2 !== 1 || skipNumber < 0 || skipNumber > 50) {skipNumber = prompt("I'm sorry, your number must be odd and between 1 and 50 - please enter a new a number")}

console.log("The number to skip is: " + skipNumber)

for (var i = 1; i<50; i++) {
    if (i % 2 == 0) {continue}
    if (i==skipNumber) {console.log("Yikes! Skipping number: " + skipNumber); i++ ; continue}
    console.log("Here is an odd number: " + i)
}
//
// var play = confirm("Would you like to pick a number?")
//
// while (play ==false) {play = confirm("You have to pick a number. Would you like a number?")}