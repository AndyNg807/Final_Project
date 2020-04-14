const express = require('express');
const app = express();
const port = process.env.PORT ||3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 


//Databas connection
let uri = "mongodb://webuser:web123456@cluster0-shard-00-00-fncee.mongodb.net:27017,cluster0-shard-00-01-fncee.mongodb.net:27017,cluster0-shard-00-02-fncee.mongodb.net:27017/webSiteProject?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//Model
const upload = require('./modules/uploadImage');

//Middlewares
app.set('view engine', 'pug'); 
app.use('/', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false })); 
app.locals.moment = require('moment'); 

//Modules
const entrypoint = require("./routes/entrypoint");
const product = require("./routes/product");
const productDetails = require("./routes/productDetails");
const about = require("./routes/about");
const dataCheck = require("./routes/dataCheck");
const {get: registerGet, post: registerPost } = require("./routes/register");
const {get: loginGet, post: loginPost } = require("./routes/login");
const logout = require("./routes/logout");
const addCart = require("./routes/addCart");
const reduceCart = require("./routes/reduceCart");
const deleteCart = require("./routes/deleteCart");
const Cart = require("./routes/cart");
const {get: userListGet, post: userListPost } = require("./routes/userList");
const {get: userUpdateGet, post: userUpdatePost } = require("./routes/userUpdate");
const userDelete = require("./routes/userDelete");
const {get: productCreateGet, post: productCreatePost } = require("./routes/productCreate");
const {get: productUpdateGet, post: productUpdatePost } = require("./routes/productUpdate");
const productDelete = require("./routes/productDelete");
const cartRecord = require("./routes/cartRecord");
const {get: orderListGet, post: orderListPost } = require("./routes/orderList");
const {get: orderUpdateGet, post: orderUpdatePost } = require("./routes/orderUpdate");
const orderDelete = require("./routes/orderDelete");


app.get('/', entrypoint);
app.get('/product', product);
app.get('/product/:id', productDetails);
app.get('/about', about);
app.post('/dataCheck', dataCheck);
app.get('/register', registerGet);
app.post('/register', registerPost);
app.get('/login', loginGet);
app.post('/login', loginPost);
app.get('/logout', logout);
app.post('/addCart', addCart);
app.post('/reduceCart', reduceCart);
app.post('/deleteCart', deleteCart);
app.get('/cart', Cart);
app.get('/userList', userListGet);
app.post('/userList', userListPost);
app.get('/userUpdate/:id', userUpdateGet);
app.post('/userUpdate', userUpdatePost);
app.get('/userDelete/:id', userDelete);
app.get('/productCreate', productCreateGet);
app.post('/productCreate', upload.single('image'), productCreatePost);
app.get('/productUpdate/:id', productUpdateGet); 
app.post('/productUpdate', upload.single('image'), productUpdatePost);
app.get('/productDelete/:id', productDelete);
app.get('/cartRecord', cartRecord);
app.get('/orderList', orderListGet);
app.post('/orderList', orderListPost);
app.get('/orderUpdate/:id', orderUpdateGet);
app.post('/orderUpdate', orderUpdatePost);
app.get('/orderDelete/:id', orderDelete);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});