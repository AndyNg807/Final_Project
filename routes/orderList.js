require("../modules/variable")
const SoldProduct = require('../models/soldProduct');

const get = async (req, res) => {
    const documents = await SoldProduct.find().exec();
    console.log(documents);
    console.log(`total ${documents.length} item`)

    const mainData = {
        stage:global.userStatusx.login,
        crud:global.userStatusx.admin,
        count:global.userStatusx.cartCount,
        username:`Welcome ${global.userStatusx.user} !!!`,
        result: `Total result: ${documents.length} record`
    };
    const indexVariables = {
        order: documents,
        main: mainData
    }
    res.render('orderList', { variables: indexVariables });
};

const post = async (req, res) => {
    const keyword = req.body.findUser
    
    if (keyword == ""){
        documents = await SoldProduct.find().exec();
    }else{
        const reg = new RegExp(keyword, 'i')//i意思為不分大小寫
        //documents = await Member.find({name: keyword}).exec();
        //模糊查詢 by name
        documents = await SoldProduct.find({name: {$regex : reg}}).exec(); 
    }
    const mainData = {
        stage:global.userStatusx.login,
        crud:global.userStatusx.admin,
        count:global.userStatusx.cartCount,
        username:`Welcome ${global.userStatusx.user} !!!`,
        result: `Total result: ${documents.length} record`

    };
    const indexVariables = {
        order: documents,
        main: mainData
    }
    res.render('orderList', { variables: indexVariables });

};

module.exports = {
    get: get,
    post: post
};
