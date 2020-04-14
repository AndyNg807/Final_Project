require("../modules/variable");
const Product = require('../models/product');

const get = (req, res) => {
    const mainData = {
        stage:global.userStatusx.login,
        crud:global.userStatusx.admin,
        count:global.userStatusx.cartCount,
        username:`Welcome ${global.userStatusx.user} !!!`,
        title: "Create Product",
        url:"/productCreate"
    };
    const document = {}   //因應下頁(request.pug)的設定, 要加上這個空值,否則會error;
    
    const indexVariables = {
        main: mainData,
        srw: document
    }

    res.render('request', { variables: indexVariables });
};


const post = async (req, res) => {   
    try{
        const newProduct = {
            code:req.body.pcode.toUpperCase(),
            name:req.body.pname.toUpperCase(),
            release:req.body.release.toUpperCase(),
            scale:req.body.scale.toUpperCase(),
            price:req.body.price,
            parts:req.body.part,
            material:req.body.material.toUpperCase(),
            image: req.file.filename
        }
        const product = new Product(newProduct);
            
        //DBconnect ("project");
        document = await product.save()
        console.log("data inserted : " + document);
    }catch(err){
        console.log("ERR: ", err);
    } finally {
        res.redirect('/product');
    }
};

module.exports = module.exports = {
    get: get,
    post: post
};