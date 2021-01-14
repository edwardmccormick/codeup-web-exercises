const users = [
    {
        id: 1,
        name: 'ryan',
        email: 'ryan@codeup.com',
        languages: ['clojure', 'javascript'],
        yearsOfExperience: 5
    },
    {
        id: 2,
        name: 'luis',
        email: 'luis@codeup.com',
        languages: ['java', 'scala', 'php'],
        yearsOfExperience: 6
    },
    {
        id: 3,
        name: 'zach',
        email: 'zach@codeup.com',
        languages: ['javascript', 'bash'],
        yearsOfExperience: 7
    },
    {
        id: 4,
        name: 'fernando',
        email: 'fernando@codeup.com',
        languages: ['java', 'php', 'sql'],
        yearsOfExperience: 8
    },
    {
        id: 5,
        name: 'justin',
        email: 'justin@codeup.com',
        languages: ['html', 'css', 'javascript', 'php'],
        yearsOfExperience: 9
    }
];

console.log("Map-filter loaded")

const prolific = users.filter(user => user.languages.length >= 3);
console.log(prolific)


// function prolificCoders() {
//     let output = []
//     for (var i = 0; i < users.length; i++) {
//         if (users[i].languages.length >=3) {output.push(users[i].name); console.log(users[i].name)}
//
//     }
// return output
// }
// let prolificOldSchool = prolificCoders()

const emails = users.map(user => user.email)
console.log(emails)

const experience = users.reduce((total, user) => {return total + user.yearsOfExperience}, 0)
console.log(experience)

const avgExperience = experience/users.length
console.log(avgExperience)

// Use .reduce to get the longest email from the list of users.

const longestEmail = users.reduce((a, b) => a.email.length > b.email.length ? a : b).email
console.log(longestEmail)

// var arr = [
//     {
//         "title": "Ender's Game",
//         "genre": "Science Fiction",
//         "year": 2008
//     },
//     {
//         "title": "Harry Potter and the Goblet of Fire",
//         "genre": "fantasy",
//         "year": 2002
//     },
//     {
//         "title": "Pride and Predjudice",
//         "genre": "romance",
//         "year": 1980
//     },
//     {
//         "title": "Pride and Predjudice",
//         "genre": "asdasdasd asdasdasdsa asdasda",
//         "year": 1980
//     }
// ]
// var longest = arr.reduce(function (a, b) { return a.genre.length > b.genre.length ? a : b; }).genre;
// console.log(longest);

// const instructorString = users.reduce()

// Use .reduce to get the list of user's names in a single string. Example: Your instructors are: ryan, luis, zach, fernando, justin.

let userArr = users.reduce((names, user) => [...names, user.name])
    console.log(userArr)
let userString = 'Your instructors are: ' + userArr.join(', ') + '.'

console.log(userString)

function uniqueLanguages(users) {
    let output = users[0].languages
    for (let i = 0; i < users.length; i++) {
        for (let ii = 0; ii < users[i].languages.length; ii++) {
            let count = 0
            for (let iii = 0; iii < output.length; iii++) {
                        if (output[iii] === users[i].languages[ii]) {count++}}
            if (count === 0) {output.push(users[i].languages[ii])}
                    }
        }
    return output
}

console.log(uniqueLanguages(users))