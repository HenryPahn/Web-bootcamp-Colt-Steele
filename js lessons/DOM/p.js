// use button
const addBtn = () => {
    alert('Button 1');
}

// add event to a variable
const btn = document.querySelector('#v2'); 
btn.addEventListener('click', ()=> {
    alert('Button 2')
})

document.querySelector("#v3").onclick = () => {
    alert("Button 3");
};

document.querySelector('#hello').addEventListener('click', ()=>{
    alert('hello');
})

document.querySelector('#goodbye').addEventListener('click', ()=>{
    alert('goodbye');
})

const colorBtn = document.querySelector('#color'); 

const h1 = document.querySelector('h1'); 

const randomColor = () => {
    const r = Math.floor(Math.random() * 255);  
    const g = Math.floor(Math.random() * 255);  
    const b = Math.floor(Math.random() * 255); 
    return `rgb(${r}, ${g}, ${b})`; 
}

colorBtn.addEventListener('click', ()=>{
    const newColor = randomColor();
    document.body.style.backgroundColor = newColor; 
    h1.innerText = newColor;
})

const h2 = document.querySelector('#thisKW'); 

h2.addEventListener('click', function() {
    this.style.backgroundColor = randomColor();
})

// Take input value from the keyboard
// const input = document.querySelector('input'); 
// input.addEventListener('keyup', function(e) {
//     alert(`${e.key} and ${e.code}`);
// })

// work w form 
const form = document.querySelector('#shelterForm'); 
const catInput = document.querySelector('#catName');
const hoangInput = document.querySelector('#Hoang');
const catDisplay = document.querySelector('#cats'); 
form.addEventListener('submit', function(e) {
    e.preventDefault(); 
    const newLI = document.createElement("LI");
    newLI.innerText = catInput.value + hoangInput.value;
    catDisplay.append(newLI);
    catInput.value = "";
})

// fake request 
const fakeRequest = (url) => {
     return new Promise((resolve, reject) => {
        const rand = Math.random();
        setTimeout(() => {
            if(rand < 0.7) {
                resolve('YOUR FAKE DATA HERE');
            }
            reject('REJECT ERROR');
        }, 1000)
     })
}

fakeRequest('/dogs/1')
    .then((data) => {
        console.log("DONE WITH REQUEST!");
        console.log('data is:', data)
    })
    .catch((err) => {
        console.log("OH NO!", err)
    })

// change background color 
// const delayColorChange = (newColor, delay, doNext) => {
//     setTimeout(() => {
//         document.body.style.backgroundColor = newColor; 
//         doNext && doNext(); 
//     }, delay)
// }

// delayColorChange(randomColor(), 1000, () => {
//     delayColorChange(randomColor(), 1000, () => {
//         delayColorChange(randomColor(), 1000, () => {
//             delayColorChange(randomColor(), 1000, () => {
//                 delayColorChange(randomColor(), 1000, () => {
//                     delayColorChange(randomColor(), 1000, () => {
//                         delayColorChange(randomColor(), 1000, () => {

//                         })
//                     })
//                 })
//             })
//         })
//     })
// })

// with promise, we can optimize the above code  
const delayColorChange = (delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.body.style.backgroundColor = randomColor(); 
            resolve();
        }, delay)
    })
}

// delayColorChange(1000)
//     .then(() => delayColorChange(1000))
//     .then(() => delayColorChange(1000))
//     .then(() => delayColorChange(1000))
//     .then(() => delayColorChange(1000))
//     .then(() => delayColorChange(1000))
//     .then(() => delayColorChange(1000))

login('asdfasd', 'Concac') 
    .then(msg => {
        console.log("LOGGED IN!")
        console.log(msg)
    })
    .catch(err => {
        console.log("ERROR!"); 
        console.log(err);
    })

// use async function instead of .this
async function rainbow() {
    await delayColorChange(1000)
    await delayColorChange(1000)
    await delayColorChange(1000)
    await delayColorChange(1000)
    await delayColorChange(1000)
    await delayColorChange(1000)
    await delayColorChange(1000)
    return "ALL DONE!";
}

rainbow();

// password validation 
const login = async (username, password) => {
    if(!username || !password) throw 'Missing Credentials'
    if(password === 'Concac') return 'WELCOME!'
    throw 'INVALID PASSWORD'
}