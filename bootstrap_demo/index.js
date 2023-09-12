const express = require('express'); 
const app = express(); 
const path = require('path');

app.emit('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    console.log('home');
    res.render('home.ejs');
})

app.listen(3000, () => {
    console.log("LISTENING ON THE PORT 3000");
})