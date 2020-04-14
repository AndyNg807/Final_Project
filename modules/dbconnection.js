//database connection and disconnection
const mongoose = require('mongoose');
const dbconnection = function (dbname) {
    let uri = "mongodb://localhost:27017/" + dbname;
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function(err){
        if(err){
            console.log('connection failed...')
        }else{
            console.log('connection success...')
        }
    });
    setTimeout(function(){
        mongoose.disconnect(function(){
            console.log('db disconnected....');
        })
    }, 2000);
}

module.exports = dbconnection;