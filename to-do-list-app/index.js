// SECTION: connect modules
const express = require('express');
const app = express(); 
const path = require('path'); 
const mongoose = require('mongoose');
const methodOverride = require('method-override'); 

const Account = require('./models/account');  // use Account model 

let loginID; 

// SECTION: assign the setting name to value
app.set('view engine', 'ejs'); // use 'view engines' to render web pages through template files. 'EJS' is a templating language. 

// SECTION: setup middleware
app.use(express.static(path.join(__dirname, 'views'))); // the content of app are served from 'views' directory
                                                        /* In Colt Steele course, he has another way to implement this action: 
                                                           app.set('views', path.join(__dirname, 'views')); */
app.use(express.urlencoded({extended: true})); 
app.use(methodOverride('_method')) /* PUT and DELETE method are not parts of the HTML5 form standard. Therefore, method-override 
                                      will overridde with POST method having '?_method=DELETE' */

// SECTION: connect mongoose
main().catch(err => { // compile 'main' function. 'Catch' the error from that function is it has the error
    console.log('ON NO MONGO ERROR!!!');
    console.log(err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/toDoList'); // connect to the mongo database, named toDoList
    console.log("CONNECTION TO MONGO OPEN!!!"); 
}

// SECTION: callback functions. [ A JS CALLBACK FUNCTION: performs a certain task when called. when it runs, other functions are not running ]
// sign up 
const verifyPassword = (password, passwordConfirmation) => { // check the confirm password is whether correct or not
    if(password === passwordConfirmation) return true // if they are the same, return true
    else return false // if not, return false
}

app.post('/toDoList/account/signup', async(req, res) => { 
    if(verifyPassword(req.body.password, req.body.candidatePassword)) {
        delete req.body.candidatePassword;
        const account = new Account(req.body);
        await account.save();
        loginID = account._id;
        res.redirect(`/toDoList/account/${account._id}`);
    }
    else res.render('account/signup');
})

app.get('/toDoList/account/signup', (req, res) => {
    res.render('account/signup');
})

// log in
app.post('/toDoList/account/login', async(req, res) => {
    const usernamee  = req.body.username
    const account = await Account.findOne({ username: usernamee });
    if(account && account.password === req.body.password) {
        res.redirect(`/toDoList/account/${account._id}`)
        loginID = account._id; 
    }
    else res.redirect('/account/login');
})

app.get('/toDoList/account/login', (req, res) => {
    res.render('account/login');
})

// edit task 


// add task 


// edit password 

// show task 
app.get('/toDoList/account/:accountId/task/:taskId', async (req, res) => {
    const { accountId, taskId } = req.params; 
    const account = await Account.findById(accountId); 
    console.log(account.list[0]._id);
})

// log out account 
app.post('/toDoList/account/logout', (req, res) => {
    loginID = undefined; 
    res.redirect('/toDoList');
})

// show account 
app.get('/toDoList/account/:accountId', async(req, res) => {
    const { accountId } = req.params; // get the ID from the path
    const account = await Account.findById(accountId); // find a specific task by its id
    res.render('account/show', { account });
})

// welcome page 
app.get('/toDoList', (req, res) => {
    if(typeof loginID === "undefined")
        res.render('app/index');
    else 
        res.redirect(`/toDoList/account/${loginID}`);
})

app.listen(3000, () => { // bind and listen to the connections on the specified host and port. 3000 is a port that this file will listen to 
    console.log('LISTEN TO 3000 PORT!');
})

