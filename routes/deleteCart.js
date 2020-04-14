require("../modules/variable")

const deleteCart = (req, res) => {
    const postedId = req.body.id;
    //const postedCode = req.body.code;
    //const postedPrice = Number(req.body.price);
    //const postedImage = req.body.image;
    const postedQty = Number(req.body.qty);
    //const postedTotal = Number(req.body.total);

    for (let i=0; i<global.userStatusx.cart.length; i++){
        if (global.userStatusx.cart[i].id == postedId){
            global.userStatusx.cart.splice(i,1); //array.splice(index(排第幾的那一個), "滅去數據數量(如為0則不刪除)", "要新增的數據(可加上,用","分隔=>"a","b","c"...))
            console.log('array item deleted!')
            break;
            
        }
    }
   
    global.userStatusx.cartCount -= postedQty;
    console.log(global.userStatusx.cart);
    console.log("cartCount :" + global.userStatusx.cartCount)

    const result = {"cart":global.userStatusx.cart};
    
    res.send(result);
};

module.exports = deleteCart;