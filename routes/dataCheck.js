const Member = require('../models/member');

const dataCheck =  async (req, res) => {
    const username = req.body.username
    //dbconnection ("project");
    documents = await Member.find({name: username}).exec(); 
    res.send(documents);
}

module.exports = dataCheck;