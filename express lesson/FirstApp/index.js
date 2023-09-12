const express = require("express");
const app = express();

// app.use((req, res) => {
//     console.log("WE GOT A NEW REQUEST!!!");  
//     res.send(`<h1>Hello MTF</h1>`)
// })

app.get('/', (req, res) => {
    res.send('THIS IS THE HOMEPAGE');
})

app.get('/r/:subreddit/:postID', (req, res) => {
    const {subreddit, postID} = req.params; 
    res.send(`<h1>Viewing postID: ${postID} on the ${subreddit} subreddit</h1>`);
})

app.get('/dogs', (req, res) => {
    res.send('WOOF!!!');
})

app.get('/cats', (req, res) => {
    res.send('MEOW!!');
})

app.get('/cows', (req, res) => {
    res.send('MOOO!!');
})

app.get('/search', (req, res) => {
    const {q, c} = req.query;
    if(!q && !c) 
        res.send(`NOTHING FOUND`);
    else 
        res.send(`<h1>Search result for ${q} and color ${c}</h1>`);
})

app.get('*', (req, res) => {
    res.send('Exist if the path is unknown'); 
})



app.listen(8080, () => {
    console.log("LISTENING ON PORT 8080"); 
}) 