const SoldProduct = require('../models/soldProduct');

const orderDelete = async (req, res) => {
    const idToDelete = req.params.id;
    
    //Delete object from database
    let result = await SoldProduct.deleteOne({ _id: idToDelete }).exec();
    console.log(`record ${result} deleted`);
    res.redirect('/orderList');
};

module.exports = orderDelete;