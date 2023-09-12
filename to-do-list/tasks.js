const mongoose = require('mongoose'); 

const Task = require('./models/task'); 

main().catch(err => {
    console.log('ON NO MONGO ERROR!!!');
    console.log(err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/toDoList');
    console.log("CONNECTION TO MONGO OPEN!!!"); 
}

const Coding = new Task ({
    name: 'playinh', 
    date: new Date ('2023-09-05'), 
    note: 'each day will be brighter'
});
Coding.save()
    .then(res => console.log(res))
    .catch(err => console.log(err));