require("../modules/variable")

const logout = (req, res) => {
    global.userStatusx.login = false;
    global.userStatusx.admin = false;
    global.userStatusx.user = "user";
    global.userStatusx.cart = [];
    global.userStatusx.cartCount = 0;
    global.userStatusx.sub = 0;
    global.userStatusx.vat = 0;
    global.userStatusx.ttl = 0;
    console.log(`login:${global.userStatusx.login}, admin:${global.userStatusx.admin}, user:${global.userStatusx.user}`);
    res.redirect('/');

}

module.exports = logout;