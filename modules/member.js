const mongoose = require('mongoose'); //npm install mongoose

//Mongoose Model (Work as a Schema)
const Member = mongoose.model('login', {
    name: String,
    password: String,
    email: String,
    admin: Boolean
},'login');

module.exports = Member;