require("../modules/variable")

const about = async (req, res) => {
    const mainData = {
        stage:global.userStatusx.login,
        crud:global.userStatusx.admin,
        count:global.userStatusx.cartCount,
        username:`Welcome ${global.userStatusx.user} !!!`       
    };
    const indexVariables = {
        main: mainData,
    }
    res.render('about',{ variables: indexVariables });
}

module.exports = about;