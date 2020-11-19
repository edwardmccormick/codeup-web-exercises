
    "use strict";

    /**
     * TODO:
     * Create an object with firstName and lastName properties that are strings
     * with your first and last name. Store this object in a variable named
     * `person`.
     *
     * Example:
     *  > console.log(person.firstName) // "Rick"
     *  > console.log(person.lastName) // "Sanchez"
     */

    var person = {};
    person.firstName = "Ted"
    person.lastName = "McCormick"

    var person2 = {
        firstName: "David",
        lastName: "Stephens"
    }

    console.log(person.firstName) // "Ted"
    console.log(person.lastName) // "McCormick"

    /**
     * TODO:
     * Add a sayHello method to the person object that returns a greeting using
     * the firstName and lastName properties.
     * console.log the returned message to check your work
     *
     * Example
     * > console.log(person.sayHello()) // "Hello from Rick Sanchez!"
     */

    person.sayHello = function () {
        return "Hello there from " + this.firstName + " " + this.lastName
    }

    console.log(person.sayHello())

    /** TODO:
     * HEB has an offer for the shoppers that buy products amounting to
     * more than $200. If a shopper spends more than $200, they get a 12%
     * discount. Write a JS program, using conditionals, that logs to the
     * browser, how much Ryan, Cameron and George need to pay. We know that
     * Cameron bought $180, Ryan $250 and George $320. Your program will have to
     * display a line with the name of the person, the amount before the
     * discount, the discount, if any, and the amount after the discount.
     *
     * Uncomment the lines below to create an array of objects where each object
     * represents one shopper. Use a foreach loop to iterate through the array,
     * and console.log the relevant messages for each person
     */

    var shoppers = [
        {name: 'Cameron', amount: 180},
        {name: 'Ryan', amount: 250},
        {name: 'George', amount: 320}
    ];

    function cost (x,i) {
        console.log (x[i].name + " has purchased $" + x[i].amount);
        if(x[i].amount<200) {console.log("Unfortunately, you didn't spend enough to earn a discount. Your bill is $"+x[i].amount)}
        else {console.log("Congratulations, you've earned a 12% discount."); console.log("After your discount was applied, your bill is $" + (x[i].amount-(x[i].amount*.12)))}
    }

    for (var i =0; i<shoppers.length; i++) {
        cost(shoppers,i)
    }

shoppers.forEach(function(name, index) {
        console.log (shoppers[index].name + " has purchased $" + shoppers[index].amount);
        if(shoppers[index].amount<200) {console.log("Unfortunately, you didn't spend enough to earn a discount. Your bill is $"+shoppers[index].amount)}
        else {console.log("Congratulations, you've earned a 12% discount."); console.log("After your discount was applied, your bill is $" + (shoppers[index].amount-(shoppers[index].amount*.12)).toFixed(2))}
    })


// shoppers.forEach(cost(shoppers,0)
    // console.log (this.name + " has purchased $" + this.amount);
    // if(this.amount<200) {console.log("Unfortunately, you didn't spend enough to earn a discount.")}
    // else {console.log("Congratulations, you've earned a 12% discount."); console.log("After your discount was applied, your bill is $" (this.amount-(this.amount*.12)))}

// shoppers.forEach(function())

    /** TODO:
     * Create an array of objects that represent books and store it in a
     * variable named `books`. Each object should have a title and an author
     * property. The author property should be an object with properties
     * `firstName` and `lastName`. Be creative and add at least 5 books to the
     * array
     *
     * Example:
     * > console.log(books[0].title) // "The Salmon of Doubt"
     * > console.log(books[0].author.firstName) // "Douglas"
     * > console.log(books[0].author.lastName) // "Adams"
     */
var books = [
        {title: 'Wereblood', author : {firstName: 'Eric',
        lastName: 'Iverson',
    }},
        {title: 'The Misplaced Legion', author: {firstName: 'Harry',
            lastName: 'Turtledove',
    }},
        {title: 'Hellenic Traders',
            author: {
                firstName: 'H. N.',
                lastName: 'Turteltaub',
            }},
        {title: 'Days of Infamy',
            author: {
                firstName: 'Harry',
                lastName: 'Turtledove',
            }},
        {title: "Hitler's War",
            author: {
                firstName: 'Harry',
                lastName: 'Turtledove',
            }}]


    /**
     * TODO:
     * Loop through the books array and output the following information about
     * each book:
     * - the book number (use the index of the book in the array)
     * - the book title
     * - author's full name (first name + last name)
     *
     * Example Console Output:
     *
     *      Book # 1
     *      Title: The Salmon of Doubt
     *      Author: Douglas Adams
     *      ---
     *      Book # 2
     *      Title: Walkaway
     *      Author: Cory Doctorow
     *      ---
     *      Book # 3
     *      Title: A Brief History of Time
     *      Author: Stephen Hawking
     *      ---
     *      ...
     */

    /**
     * Bonus:
     * - Create a function named `createBook` that accepts a title and author
     *   name and returns a book object with the properties described
     *   previously. Refactor your code that creates the books array to instead
     *   use your function.
     * - Create a function named `showBookInfo` that accepts a book object and
     *   outputs the information described above. Refactor your loop to use your
     *   `showBookInfo` function.
     */

for (var i = 0; i<books.length; i++) {
    console.log("Book #" + (i+1));
    console.log("Title: " + books[i].title);
    console.log("Author: " + books[i].author.firstName + " " + books[i].author.lastName)
    console.log("-----------")
}

function createBook (firstName,lastName,title,booksArr) {
    var obj = {
        title: title,
        author: {
            firstName: firstName,
            lastName: lastName,

        }
    };
    booksArr.push(obj);
    return booksArr
}

// books.forEach(function (book) {
//     console.log(book);
// })

    function showBookInfo(book) {
    var str = "Title: " + book.title + "\n";
        str +=  "Author: " + book.author.firstName + " " + book.author.lastName
    return str
}
books.forEach(function(book, index) {
    console.log("Book #" + (index+1) + "\n" +showBookInfo(book));
})