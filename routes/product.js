require("../modules/variable");
const Product = require('../models/product');

const product = async (req, res) => {
    
    const documents = await Product.find().exec();
    console.log(documents);
    console.log(`total ${documents.length} item`)

    const mainData = {
        stage:global.userStatusx.login,
        crud:global.userStatusx.admin,
        count:global.userStatusx.cartCount,
        username:`Welcome ${global.userStatusx.user} !!!`
    };
    const indexVariables = {
        srw: documents,
        main: mainData
    }
    res.render('card', { variables: indexVariables });
}

module.exports = product;