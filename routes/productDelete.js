const Product = require('../models/product');
const deleteImage = require("../modules/deleteImage");

const productDetails = async (req, res) => {
    //internal scope of this function
    const idToDelete = req.params.id;
    const document = await Product.findById(idToDelete).exec();
    //Delete the image
    deleteImage(document.image);
    //Delete object from database
    await Product.deleteOne({ _id: idToDelete }).exec();
    res.redirect('/product');
};

module.exports = productDetails;