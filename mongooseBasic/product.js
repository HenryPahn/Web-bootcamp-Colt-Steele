const mongoose = require('mongoose'); 

// connect to the mongo sever, and catch the error if there is
main().catch(err => {
    console.log('ON NO ERROR!!!');
    console.log(err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/shopApp');
    console.log("CONNECTION OPEN!!!"); 
}

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    price: {
        type: Number, 
        min: [100, "Too low for a bike"], 
        max: 1500
    }, 
    onSale: {
        type: Boolean, 
        default: false
    },
    categories: [String], 
    qty: {
        online: {
            type: Number, 
            default: 0
        },
        inStore: {
            type: Number, 
            default: 0
        }
    }, 
    size: {
        type: String, 
        enum: ['S', 'M', 'L']
    }
}); 

productSchema.methods.greet = function () {
    console.log("HELLO");
    console.log(`$${this.price} - ${this.name}`); 
}

const Product = mongoose.model('Product', productSchema); 

// const shoes = new Product({name: 'shoes', price: 378});

// Product.findOneAndUpdate({name: 'Tire Pump'}, {price: 130.99}, {new: true, runValidators: true})
//     .then(data => {
//         console.log(data);
//     })
//     .catch(err => {
//         console.log(err);
//     })

const findProduct = async () => {
    const foundProduct = await Product.findOne({name: 'Fix gear'}); 
    foundProduct.greet();
}

findProduct();