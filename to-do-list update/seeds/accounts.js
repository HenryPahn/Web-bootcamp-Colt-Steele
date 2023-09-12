const mongoose = require('mongoose'); 
const Account = require('../models/account');

main().catch(err => {
    console.log('ON NO MONGO ERROR!!!');
    console.log(err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/toDoList');
    console.log("CONNECTION TO MONGO OPEN!!!"); 
}

const Coding = new Account ({
    name: 'Hoang',
    username: 'PTH2003247', 
    password: 'HoangNTH20037', 
    list: [
        {
            name: 'playing', 
            date: new Date ('2023-09-05'), 
            note: 'each day will be brighter'
        }, 
        {
            name: 'reading',
            date: new Date ('2023-10-30'),
            note: 'reading more than I need',
        }
    ]
})

Coding.save()
    .then(res => console.log(res))
    .catch(err => console.log(err));