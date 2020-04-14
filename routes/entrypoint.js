require("../modules/variable")

const entrypoint = async (req, res) => {
    const mainData = {
        stage:global.userStatusx.login,
        crud:global.userStatusx.admin,
        count:global.userStatusx.cartCount,
        username:`Welcome ${global.userStatusx.user} !!!`       
    };
    const indexVariables = {
        main: mainData,
    }
    res.render('index',{ variables: indexVariables });
}

module.exports = entrypoint;