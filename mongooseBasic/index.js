const mongoose = require('mongoose'); 

// connect to the mongo sever, and catch the error if there is
main().catch(err => {
    console.log('ON NO ERROR!!!');
    console.log(err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/catStore');
    console.log("CONNECTION OPEN!!!"); 
}

// create a object schema
const catSchema = new mongoose.Schema ({
    name: String, 
    age: Number, 
    breed: Boolean, 
});

// compile an exist schema to a model
const Cat = mongoose.model('Cat', catSchema); 

// const mapDit = new Cat({ name: "Map Dit", age: 5, bread: true }); // create an object 

// insert many objects 
Cat.insertMany([
    {name: "Main coon", age: 4}, 
    {name: "Golden", age: 5}, 
    {name: "Racdoon", age: 12}
])
    .then(data => {
        console.log("IT WORKED!"); 
        console.log(data);
    })

    

