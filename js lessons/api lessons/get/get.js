//// this is old way to get data from source
// const myReq = new XMLHttpRequest(); 

// myReq.onload = function() {
//     console.log(this);
//     const data = JSON.parse(this.responseText); 
//     console.log("responseText: ", data);
// }

// myReq.onerror = function(err) {
//     console.log("ERRROR!", err);
// }

// myReq.open('get', 'https://icanhazdadjoke.com/', true); 
// myReq.setRequestHeader('Accept', ' application/json');
// myReq.send();


//// use fetch instead of XMLHttpRequest()
// fetch("https://swapi.dev/api/people/1/")
//     .then(res => {
//         console.log("resolve", res);
//         return res.json();
//     })
//     .then(data => {
//         console.log(data); 
//         return fetch("https://swapi.dev/api/people/2/");
//     })
//     .then(res => {
//         console.log("SECOND REQUEST DONE!"); 
//         return res.json();
//     })
//     .then(data => {
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("error", err);
//     })

//// use async function
// const loadPpl = async () => {
//     try {
//         const res1 = await fetch("https://swapi.dev/api/people/1/");
//         const data1 = await res1.json(); 
//         console.log(data1);
        
//         const res2 = await fetch("https://swapi.dev/api/people/2/"); 
//         const data2 = await res2.json();
//         console.log(data2);
//     } catch(e) {
//         console.log("Error", e);
//     }
// }

// loadPpl();

//// another way to take API is using axios 
// normal way
// axios.get("https://swapi.dev/api/people/1/")
//     .then(res => {
//         console.log("response: ", res);
//     })
//     .catch((e) => {
//         console.log("error: ", err);
//     })

// // using async function 
// const getPpl = async (id) => {
//     try {
//         const res = await axios.get(`https://swapi.dev/api/people/${id}/`); 
//         console.log(res.data);
//     } catch(e) {
//         console.log("error: ", e);
//     }
// }

// getPpl(1);

// setting header with axios 
const jokes = document.querySelector('#jokes'); 
const btn = document.querySelector('button'); 

const getDadJoke = async () => {
    try {
        const config = {headers: { Accept: 'application/json'}}; 
        const res = await axios.get('https://icanhazdadjoke.com/', config); 
        return res.data.joke;
    } catch(e) {
        return "No joke";
    }
}

const addJoke = async () => {
    const jokeText = await getDadJoke();
    const newLI = document.createElement('LI'); 
    newLI.append(jokeText);
    jokes.append(newLI);
} 

btn.addEventListener('click', addJoke)