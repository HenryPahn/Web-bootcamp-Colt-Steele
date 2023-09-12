// apply node to file 
const express = require('express'); 
const app = express(); // for the local host  
const path = require('path'); 
const mongoose = require('mongoose');
const methodOverride = require('method-override')

const Product = require('./models/product');

// set up for the node
app.set('views', path.join(__dirname, 'views')); // connect to 'views' directory 
app.set('view engine', 'ejs'); 
app.use(express.urlencoded({extended : true}))
app.use(methodOverride('_method'))

// catch any error from main function 
main().catch(err => {
    console.log('ON NO MONGO ERROR!!!');
    console.log(err);
});

// connect to mongo sever
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/farmStand');
    console.log("CONNECTION TO MONGO OPEN!!!"); 
}

// get request from the link 
app.get('/products', async (req, res) => {
    const products = await Product.find({})
    console.log(products);
    res.render('products/index', { products });
})

// make a new product
app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body); 
    await newProduct.save();
    res.redirect(`products/${newProduct.id}`);
})

app.get('/products/new', (req, res) => {
    res.render('products/new');  
})

// update a product
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params; 
    const product = await Product.findById(id);
    res.render('products/edit', {product}); 
})

app.put('/products/:id', async(req, res)=> {
    const { id } = req.params; 
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
    res.redirect(`/products/${product._id}`);
})

// find the product by id 
app.get('/products/:id', async (req, res) => {
    const { id } = req.params; 
    const product = await Product.findById(id);
    res.render('products/show', { product });
})

// listen to 3000 port
app.listen(3000, () => {
    console.log("LISTEN TO PORT 3000"); 
})