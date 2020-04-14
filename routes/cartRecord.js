require("../modules/variable")
const SoldProduct = require('../models/soldProduct');

const cartRecord = async (req, res) => {
    try{
        const newOrder = {
            userID:global.userStatusx.userID,
            name:global.userStatusx.user,
            description:global.userStatusx.cart,
            subTotal: global.userStatusx.sub,
            VAT: global.userStatusx.vat,
            totalPrice: global.userStatusx.ttl,
            comments:""
        }
        const order = new SoldProduct(newOrder);
            
        //DBconnect ("project");
        document = await order.save()
        console.log("data inserted : " + document);
    }catch(err){
        console.log("ERR: ", err);
    } finally {
        res.redirect('/logout');
    }

};

module.exports = cartRecord;