const mongoose = require('mongoose');

const Product = require('./models/product');

main().catch(err => {
    console.log('ON NO MONGO ERROR!!!');
    console.log(err);
});

// connect to mongo sever
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/farmStand');
    console.log("CONNECTION TO MONGO OPEN!!!"); 
}

// const p = new Product({
//     name: 'Ruby GrapeFruit', 
//     price: 1.00, 
//     category: 'fruit'
// })
// p.save()
//     .then(p => console.log(p))
//     .catch(e => console.log(e));

const seedProducts = [
    {
        name: 'Milk', 
        price: 5.4, 
        category: 'dairy'
    }, 
    {
        name: 'Cabbage', 
        price: 6, 
        category: 'vegetable'
    },
    {
        name: 'Grape', 
        price: 8, 
        category: 'fruit'
    }
]

Product.insertMany(seedProducts)
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    })