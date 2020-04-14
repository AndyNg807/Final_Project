const Member = require('../models/member');

const userDelete = async (req, res) => {
    const idToDelete = req.params.id;
    
    //Delete object from database
    let result = await Member.deleteOne({ _id: idToDelete }).exec();
    console.log(result);
    res.redirect('/userList');
};

module.exports = userDelete;