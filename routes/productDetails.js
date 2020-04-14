require("../modules/variable");
const Product = require('../models/product');

const productDetails = async (req, res) => {
    //internal scope of this function
    const selectedId = req.params.id;
    const document = await Product.findById(selectedId).exec();
    console.log(document);
    
    const mainData = {
        stage:global.userStatusx.login,
        crud:global.userStatusx.admin,
        count:global.userStatusx.cartCount,
        username:`Welcome ${global.userStatusx.user} !!!`
    };
    
    const indexVariables = {
        srw: document,
        main: mainData
    }

    res.render('product', { variables: indexVariables });
}

module.exports = productDetails;