require("../modules/variable");
const Product = require('../models/product');
const deleteImage = require("../modules/deleteImage");

const get = async (req, res) => {
    try {
        const selectedId = req.params.id;
        const document = await Product.findById(selectedId).exec();
        
        const mainData = {
            stage:global.userStatusx.login,
            crud:global.userStatusx.admin,
            count:global.userStatusx.cartCount,
            username:`Welcome ${global.userStatusx.user} !!!`,
            title: "Update Product",
            url:"/productUpdate"
        };
        const indexVariables = {
            main: mainData,
            srw: document
        }
        
        res.render('request', { variables: indexVariables });
    } catch (err) {
        console.log("ERR: ", err)
    } 
};


const post = async (req, res) => {
    try {
        const idToUpdate = req.body.id;

        //create the updateObject
        let updateObject = {
            code:req.body.pcode.toUpperCase(),
            name:req.body.pname.toUpperCase(),
            release:req.body.release.toUpperCase(),
            scale:req.body.scale.toUpperCase(),
            price:req.body.price,
            parts:req.body.part,
            material:req.body.material.toUpperCase(),
        }
        //logic to handle the image
        if (req.file) {
            console.log("Updating image");
            updateObject.image = req.file.filename;
        }
        //call update on database
        let filter = { _id: idToUpdate };

        //find the document and put in memory
        const document = await Product.findById(idToUpdate).exec(); //作用為先取回要delete的file name;

        let result = await Product.updateOne(filter, updateObject).exec();
        if (result.ok > 0 && req.file) {
            // delete the image 
            deleteImage(document.image);  //自定義function
        }
    } catch (err) {
        console.log("ERR: ", err);
    } finally {
        //redirect user to product view
        res.redirect('/product');
    }
};

module.exports = module.exports = {
    get: get,
    post: post
};