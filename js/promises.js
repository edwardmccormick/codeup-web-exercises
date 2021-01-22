// fetch(url, {headers: {'Authorization': 'token ' + github_access_token}})

function getGithubUsernames() {
    return fetch('https://api.github.com/users')
        .then(response => response.json())
}

// later on...

// getGithubUsernames().then( users => {
//     users.forEach( userObj => {
//         // do something with each username
//         console.log(userObj);
//         console.log(userObj.login);
//     });
// }).catch(error => console.error(error));

function getUsernameActivity(username) {
    return fetch('https://api.github.com/users/' + username + '/events/public', {headers: {'Authorization': 'token ' + github_access_token}})
        .then(data => data.json()).then(data => {
            console.log(data)
            return data.filter(event=>event.type === "PushEvent")
        }).then(pushEvents => {
            console.log(pushEvents[0].created_at)
            return pushEvents[0].created_at
            return pushEvents[0].actor.url
            return
            }

        ).catch(error => console.error(error))
}

console.log(getUsernameActivity("edwardmccormick"))

// let output
// let userdata = getUsernameActivity("edwardmccormick")
//
// function getUsernameLastCommit(username) {
// data = getUsernameActivity(username)
//     console.log(data)
//             for (let i = 0; i < data.length; i++) {
//                 if (data[i].type == "PushEvent") {output = data[i].created_at; break}
//             }
//             return output
//         }

const wait = (ms) => {
    return new Promise((resolve, reject)=>{
      setTimeout(resolve,ms)
    })
}

wait(1000).then(() => console.log('You\'ll see this after 1 second'));
wait(3000).then(() => console.log('You\'ll see this after 3 seconds'));