// SECTION: connect modules
const express = require('express');
const app = express(); 
const path = require('path'); 
const mongoose = require('mongoose');
const methodOverride = require('method-override'); 

const Account = require('./models/account');  // use Account model 
const { findById } = require('./models/account');

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
// sign up. username, password, and confirm password // [NOTE: need to response an alert about the confirm password are not correct]
const verifyPassword = (password, passwordConfirmation) => { // check the confirm password is whether correct or not
    if(password === passwordConfirmation) return true // if they are the same, return true
    else return false // if not, return false
}

app.post('/accounts/newAccount', async(req, res) => { 
    if(verifyPassword(req.body.password, req.body.candidatePassword)) {
        delete req.body.candidatePassword;
        const account = new Account(req.body);
        await account.save();
        loginID = account._id;
        res.render('accounts/show', { account });
    }
    else res.render('accounts/signup');
})

app.get('/accounts/signup', (req, res) => {
    res.render('accounts/signup');
})

// log in. include username and password
app.post('/accounts/show', async(req, res) => {
    const usernamee  = req.body.username
    const account = await Account.findOne({ username: usernamee });
    if(account && account.password === req.body.password) {
        res.render('accounts/show', { account })
        loginID = account._id; 
    }
    else res.redirect('/accounts/login');
})

app.get('/accounts/login', (req, res) => {
    res.render('accounts/login');
})

// change password. old password, new password, and confirm password
app.put('/accounts/newPW',  async(req, res) => {
    const account = await Account.findById(loginID); 
    const oldPassword = req.body.password; 
    const newPassword = req.body.newPassword; 
    const candidatePassword = req.body.candidatePassword;
    if(oldPassword !== account.password || newPassword !== candidatePassword) 
        res.redirect('/accounts/editPW')
    else {
        await Account.findByIdAndUpdate(loginID, {password: newPassword}, {runValidators: true, new: true}); 
        res.redirect(`/accounts/${loginID}`);
    }
})

app.get('/accounts/editPW', async(req, res) => {
    const account = await Account.findById(loginID); 
    res.render('accounts/edit', { account });
})

// log out
app.post('/accounts/logout', (req, res) => {
    loginID = undefined; 
    res.redirect('/accounts');
})

// welcome page. log in, sign up
app.get('/accounts', (req, res) => {
    if(typeof loginID === "undefined")
        res.render('accounts/index');
    else 
        res.redirect(`/accounts/${loginID}`);
})

// account page. log out, add task and show task list
app.get('/accounts/:id', async(req, res) => {
    const { id } = req.params; // get the ID from the path
    const account = await Account.findById(id); // find a specific task by its id
    res.render('accounts/show', { account });
})

app.listen(3000, () => { // bind and listen to the connections on the specified host and port. 3000 is a port that this file will listen to 
    console.log('LISTEN TO 3000 PORT!');
})

