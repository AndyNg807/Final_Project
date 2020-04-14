require("../modules/variable")

const addCart = (req, res) => {
    const postedId = req.body.id;
    const postedCode = req.body.code;
    const postedPrice = Number(req.body.price);
    const postedImage = req.body.image;

    let itemCheck = true;     //檢查之前有否該貨品己加到購物車中;
    for (let i=0; i<global.userStatusx.cart.length; i++){
        if (global.userStatusx.cart[i].id == postedId){
            global.userStatusx.cart[i].qty += 1;
            global.userStatusx.cart[i].total += postedPrice
            itemCheck = false;
        }
    }
    if(itemCheck){
        console.log(`cart item: ${global.userStatusx.cart.length}`);
        const updateObject = {
            id:postedId,
            code:postedCode,
            price:postedPrice,
            image:postedImage,
            qty:1,
            total:postedPrice
        }
        global.userStatusx.cart.push(updateObject);  //把updateObject加到"cart"這array中;
    }
    global.userStatusx.cartCount++;  //購物車數量加一;
    console.log(global.userStatusx.cart);
    console.log("cartCount :" + global.userStatusx.cartCount)

    const result = {"cart":global.userStatusx.cart};
    
    res.send(result);
};

module.exports = addCart;