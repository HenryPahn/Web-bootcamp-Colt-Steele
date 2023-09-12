const mongoose = require('mongoose'); 
const taskSchema = require('./task');

const accountSchema = new mongoose.Schema({  
    name: {
        type: String, 
        required: true
    },
    username: {
        type: String,
        required: true, 
        index: { unique: true }
    }, 
    password: {
        type: String, 
        required: true 
    },
    list: [taskSchema] // source: https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
})

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;