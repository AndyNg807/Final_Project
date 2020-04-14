const mongoose = require('mongoose'); 

//Mongoose Model (Work as a Schema)
const Product = mongoose.model('product', {
    code: String,
    name: String,
    release: String,
    scale: String,
    price: Number,
    parts: String,
    material: String,
    image: String
},'product');

module.exports = Product;