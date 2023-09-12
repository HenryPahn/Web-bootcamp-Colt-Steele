const jokes = require(`give-me-a-joke`);

const colors = require(`colors`); 

const cow = require(`cowsay`)

jokes.getRandomDadJoke (function(joke) {
    console.log(joke.rainbow);
});

console.log(cow.say({
    text : "I'm a nerd",
    e : "oO",
    T : "U "
}).rainbow);

