let maximum = parseInt(prompt("Enter the maximum: "));
while(!maximum) 
    maximum = alert(parseInt(prompt("Enter the maximum again: ")));

const number = Math.round(Math.random()*maximum) + 1;

let guess = parseInt(prompt("Enter your guess: ")); 
let attempt = 1;
while(parseInt(guess) !== number) {
    if (guess === 'q') break;
    attempt++;
    if (guess > number) 
        guess = prompt("It's lower!"); 
    else 
        guess = prompt("It's higher!"); 
}

if(guess === 'q') 
    console.log("you quit!");
else 
    console.log("Congratulation! You finish with " + attempt);
     