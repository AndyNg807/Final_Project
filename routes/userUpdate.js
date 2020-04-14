require("../modules/variable")
const Member = require('../models/member');

const get = async (req, res) => {
    const selectedId = req.params.id;
    const document = await Member.findById(selectedId).exec();
    console.log(document);
    
    const mainData = {
        stage:global.userStatusx.login,
        crud:global.userStatusx.admin,
        count:global.userStatusx.cartCount,
        username:`Welcome ${global.userStatusx.user} !!!`
    };
    
    const indexVariables = {
        member: document,
        main: mainData
    }

    res.render('userUpdate', { variables: indexVariables });
};

const post = async (req, res) => {
    try{
        const idToUpdate = req.body.id;
        const updateObject = {
            name:req.body.username,
            password:req.body.password,
            email:req.body.email,
            admin:req.body.admin
        }

        let filter = { _id: idToUpdate };
        //DBconnect ("project");
        let result = await Member.updateOne(filter, updateObject).exec();
        console.log(result);    
       
    }catch(err){
        console.log("ERR: ", err);
    } finally {
        res.redirect('/userList');
    }
};

module.exports = {
    get: get,
    post: post
};
