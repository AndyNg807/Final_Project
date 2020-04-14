require("../modules/variable")
const Member = require('../models/member');

const get = (req, res) => {
    const mainData = {
        stage:global.userStatusx.login,
        crud:global.userStatusx.admin,
        count:global.userStatusx.cartCount,
        username:`Welcome ${global.userStatusx.user} !!!`       
    };
    const indexVariables = {
        main: mainData,
    }
    res.render('register',{ variables: indexVariables });
};

const post = async (req, res) => {
    try{
        const newUser = {
            name:req.body.username,
            password:req.body.password,
            email:req.body.email,
            admin:false
        }
        const member = new Member(newUser);
             
        //DBconnect ("project");
        document = await member.save()
        console.log("member inserted : " + document);
    }catch(err){
        console.log("ERR: ", err);
    } finally {
        res.redirect('/');
    }
};

module.exports = {
    get: get,
    post: post
};
  