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

module.exports = taskSchema; // only export the schema instead of module because
                             // taskSChema is a child schema of accountSchema