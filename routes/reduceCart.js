require("../modules/variable")

const reduceCart = (req, res) => {
    const postedId = req.body.id;
    //const postedCode = req.body.code;
    const postedPrice = Number(req.body.price);
    //const postedImage = req.body.image;
    const postedQty = Number(req.body.qty);

    if (postedQty > 0){ 
        let itemCheck = true;
        for (let i=0; i<global.userStatusx.cart.length; i++){
            if (global.userStatusx.cart[i].id == postedId){
                global.userStatusx.cart[i].qty -= 1;
                global.userStatusx.cart[i].total -= postedPrice
                itemCheck = false;
            }
        }
        global.userStatusx.cartCount--;
        console.log(global.userStatusx.cart);
        console.log("cartCount :" + global.userStatusx.cartCount)
        
    }   
    res.send(global.userStatusx.cart);
};

module.exports = reduceCart;