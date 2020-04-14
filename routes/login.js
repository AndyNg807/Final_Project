require("../modules/variable")
const Member = require('../models/member');

const get = async (req, res) => {
    const mainData = {
        stage:global.userStatusx.login,
        crud:global.userStatusx.admin,
        count:global.userStatusx.cartCount,
        username:`Welcome ${global.userStatusx.user} !!!`       
    };
    const indexVariables = {
        main: mainData,
    }
    res.render('login',{ variables: indexVariables });
};

const post = async (req, res) => {
    
    const name = req.body.username;
    const password = req.body.password;
    const document = await Member.find({name: name}).exec();
    if (document.length == 1){
        if(password == document[0].password){
            global.userStatusx.login=true;
            global.userStatusx.admin=document[0].admin;
            global.userStatusx.user=document[0].name;
            global.userStatusx.userID=document[0]._id;
            console.log(`user ${name} login successed`)
            res.redirect('/');
            return res.end();
        }
    }
        console.log(`user ${name} login failed`)
        
        const mainData = {
            stage:global.userStatusx.login,
            crud:global.userStatusx.admin,
            count:global.userStatusx.cartCount,
            username:`Welcome ${global.userStatusx.user} !!!`,
            error: 'Invaild email or password, please try again.'   
        };
        const indexVariables = {
            main: mainData,
        }
        
        res.render('login',{ variables: indexVariables });
        
};

module.exports = 
{
    get: get,
    post: post
  };
  