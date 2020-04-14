require("../modules/variable")

const cart = (req, res) => {
    let myCart = global.userStatusx.cart;
    let cartTotal = 0;
    
    for(let i=0; i < myCart.length; i++){
        
        cartTotal += myCart[i].total
    }
    console.log("total" + cartTotal)
    
    const VAT = Math.round(cartTotal * 0.05);
    const billTotal = VAT + cartTotal;

    global.userStatusx.sub = cartTotal;

    global.userStatusx.vat = VAT;

    global.userStatusx.ttl = billTotal;

    const mainData = {
        stage:global.userStatusx.login,
        crud:global.userStatusx.admin,
        count:global.userStatusx.cartCount,   //購物車貨品
        username:`Welcome ${global.userStatusx.user} !!!`,
        cart:myCart,
        sub:cartTotal, 
        vat:VAT,
        ttl:billTotal 
    };
    const indexVariables = {
        main: mainData,
    }
    res.render('cart',{ variables: indexVariables });
}

module.exports = cart;