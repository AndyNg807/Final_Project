require("../modules/variable")
const SoldProduct = require('../models/soldProduct');

const get = async (req, res) => {
    const selectedId = req.params.id;
    const document = await SoldProduct.findById(selectedId).exec();
    console.log(document);
    
    const mainData = {
        stage:global.userStatusx.login,
        crud:global.userStatusx.admin,
        count:global.userStatusx.cartCount,
        username:`Welcome ${global.userStatusx.user} !!!`
    };
    
    const indexVariables = {
        order: document,
        main: mainData
    }

    res.render('orderUpdate', { variables: indexVariables });
};

const post = async (req, res) => {
    try{
        const idToUpdate = req.body.id;
        const updateObject = {
            //userID:req.body.userID,
            //name:req.body.username,
            //description:req.body.description,
            //subTotal:req.body.subTotal,
            //VAT:req.body.VAT,
            //totalPrice:req.body.totalPrice,
            comments:req.body.comments
        }

        let filter = { _id: idToUpdate };
        //DBconnect ("project");
        let result = await SoldProduct.updateOne(filter, updateObject).exec();
        console.log(`record ${result} updated.`);    
       
    }catch(err){
        console.log("ERR: ", err);
    } finally {
        res.redirect('/orderList');
    }
};

module.exports = {
    get: get,
    post: post
};
