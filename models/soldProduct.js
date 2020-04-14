const mongoose = require('mongoose'); 

//Mongoose Model (Work as a Schema)
const SoldProduct = mongoose.model('soldProduct', {
    userID: String,
    name: String,
    description: Array,
    subTotal: Number,
    VAT: Number,
    totalPrice: Number,
    comments: String,
    date: { type: Date, default: Date.now },
},'soldProduct');

module.exports = SoldProduct;