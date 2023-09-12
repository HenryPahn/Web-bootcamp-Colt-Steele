// SECTION: connect modules
const express = require('express');
const app = express(); 
const path = require('path'); 
const mongoose = require('mongoose');
const methodOverride = require('method-override')

const Task = require('./models/task'); // use Task model from Mongoose

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
app.get('/toDoList', async (req, res) => { // get request with 'localhost:3000/toDoList' path to access 'index' page, which shows the list of tasks
    const tasks = await Task.find({}); // 'tasks' is an array containing the list of task. the list of task is obtained through 'find' function
    res.render('index', { tasks });
})

// Those functions are used for adding a new task to the list
/*****************************************************/ 
app.post('/toDoList/newTask', async(req, res) => { // sending data to Mongo database, 'toDoList'. Then display 'show' page
    const task = new Task(req.body); // obtaining data from the request body, and creating a new Task object
    await task.save(); // saving to the database
    res.render('show', {task});
})

app.get('/toDoList/add', (req, res) => { // get request with 'localhost:3000/toDoList/add' path to access 'add' page
    res.render('add');
})
/*****************************************************/ 
///////////////////////////////////////////////////////

// Thos functions are used for editting or updating a certain task
/*****************************************************/ 
app.put('/toDoList/:id', async(req, res)=> { 
    const { id } = req.params; 
    const task = await Task.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
    res.redirect(`/toDoList/${task._id}`);
})

app.get('/toDoList/:id/edit', async (req, res) => { /* obtain ID from path, and find a task by that. get request with 'localhost:3000/toDoList/edit' 
                                                       path to access 'edit' page with the found task */
    const { id } = req.params; // get the ID from the path
    const task = await Task.findById(id); // find a specific task by its id
    res.render('edit', {task});
})
/*****************************************************/ 
///////////////////////////////////////////////////////

app.delete('/toDoList/:id', async (req, res) => { // deleting a task from database by id
    const { id } = req.params; // get the ID from the path
    const task = await Task.findByIdAndDelete(id); // find a task by ID, and then delete it
    res.redirect('/toDoList');
})

app.get('/toDoList/:id', async(req, res) => {  // show a specific task page by finding ID. 'show' page display all information of a task
    const { id } = req.params; // get the ID from the path
    const task = await Task.findById(id); // find a specific task by its id
    res.render('show', { task });
})

app.listen(3000, () => { // bind and listen to the connections on the specified host and port. 3000 is a port that this file will listen to 
    console.log('LISTEN TO 3000 PORT!');
})

