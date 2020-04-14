require("../modules/variable")
const Member = require('../models/member');

const get = async (req, res) => {
    const documents = await Member.find().exec();
    console.log(documents);
    console.log(`total ${documents.length} item`)

    const mainData = {
        stage:global.userStatusx.login,
        crud:global.userStatusx.admin,
        count:global.userStatusx.cartCount,
        username:`Welcome ${global.userStatusx.user} !!!`,
        result: `Total result: ${documents.length} record`

    };
    const indexVariables = {
        member: documents,
        main: mainData
    }
    res.render('userList', { variables: indexVariables });
};

const post = async (req, res) => {
    const keyword = req.body.findUser
    
    if (keyword == ""){
        documents = await Member.find().exec();
    }else{
        const reg = new RegExp(keyword, 'i')//i意思為不分大小寫
        //documents = await Member.find({name: keyword}).exec();
        //模糊查詢 by name & email
        documents = await Member.find(
            {
                $or:[
                    {name: {$regex : reg}},
                    {email: {$regex : reg}}
                ]
            }
                    
        ).exec(); 

    }
    const mainData = {
        stage:global.userStatusx.login,
        crud:global.userStatusx.admin,
        count:global.userStatusx.cartCount,
        username:`Welcome ${global.userStatusx.user} !!!`,
        result: `Total result: ${documents.length} record`

    };
    const indexVariables = {
        member: documents,
        main: mainData
    }
    res.render('userList', { variables: indexVariables });

};

module.exports = {
    get: get,
    post: post
};
