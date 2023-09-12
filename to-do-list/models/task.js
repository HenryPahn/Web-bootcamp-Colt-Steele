const mongoose = require('mongoose');  
const moment = require('moment');

const taskSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        minLength: 1
    }, 
    date: {
        type: Date, 
        min: moment().format('YYYY-MM-DD')
    },
    note: {
        type: String, 
        required: true, 
        minLength: 1, 
        maxLength: 500
    }
})

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;