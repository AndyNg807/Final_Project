const express = require('express');
const app = express();
const fs = require('fs');
const port = process.env.PORT ||3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const urlencodedParser = bodyParser.urlencoded({ extended: false }); 


//Databas connection
let uri = "mongodb://webuser:web123456@cluster0-shard-00-00-fncee.mongodb.net:27017,cluster0-shard-00-01-fncee.mongodb.net:27017,cluster0-shard-00-02-fncee.mongodb.net:27017/webSiteProject?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"
//let uri = "mongodb://localhost:27017/project";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//Middlewares
app.set('view engine', 'pug'); //Setting up pug as template engine
app.use('/', express.static('public'));


//Mongoose Model (Work as a Schema)
const Member = require('./modules/member');
const Product = require('./modules/product');
const deleteImage = require('./modules/deleteImage');
const upload = require('./modules/uploadImage');


//set global variable
let login = false;
let admin = false;
let user = "user";
let cart = [];
let cartCount = 0;



//Index - Entry point - First page a user will see 
app.get('/', async (req, res) => {
    const mainData = {
        stage:login,
        crud:admin,
        count:cartCount,
        username:`Welcome ${user} !!!`       
    };
    const indexVariables = {
        main: mainData,
    }
    res.render('index',{ variables: indexVariables });
});

//about view
app.get('/about', (req, res) => {
    const mainData = {
        stage:login,
        crud:admin,
        count:cartCount,
        username:`Welcome ${user} !!!`       
    };
    const indexVariables = {
        main: mainData,
    }

    res.render('about', { variables: indexVariables });
})


//register end point
app.get('/register', (req, res) => {
    const mainData = {
        stage:login,
        crud:admin,
        count:cartCount,
        username:`Welcome ${user} !!!`       
    };
    const indexVariables = {
        main: mainData,
    }
    res.render('register',{ variables: indexVariables });
})


//register post method
app.post('/addUser', urlencodedParser, async (req, res) => {
    try{
        const newUser = {
            name:req.body.username,
            password:req.body.password,
            email:req.body.email,
            admin:false
        }
        const member = new Member(newUser);
        document = await member.save()
        console.log("member inserted : " + document);
    }catch(err){
        console.log("ERR: ", err);
    } finally {
        res.redirect('/');
    }
})

//check register exist method
app.post('/dataCheck', urlencodedParser, async (req, res) => {
    const username = req.body.username
    //dbconnection ("project");
    documents = await Member.find({name: username}).exec(); 
    res.send(documents);
});

//login end point
app.get('/login', async (req, res) => {
    //internal scope of this function
    const mainData = {
        stage:login,
        crud:admin,
        count:cartCount,
        username:`Welcome ${user} !!!`       
    };
    const indexVariables = {
        main: mainData,
    }
    res.render('login',{ variables: indexVariables });
})

//login post method
app.post('/userLogin', urlencodedParser, async (req, res) => {
    //internal scope of this function
    const name = req.body.username;
    const password = req.body.password;
    const document = await Member.find({name: name}).exec();
    if (document.length == 1){
        if(password == document[0].password){
            login=true;
            admin=document[0].admin;
            user=document[0].name;
            console.log(`user ${user} login successed`)
            res.redirect('/');
            return
        }
    }
        console.log(`user ${name} login failed`)
        const mainData = {
            stage:login,
            crud:admin,
            count:cartCount,
            username:`Welcome ${user} !!!`,
            error: 'Invaild email or password, please try again.'   
        };
        const indexVariables = {
            main: mainData,
        }
        res.render('login',{ variables: indexVariables });

})

//login end point
app.get('/logout', (req, res) => {
    
        login = false;
        admin = false;
        user = "user";
        cart = [];
        cartCount = 0;
      
})


//admin userControl end point
app.get('/userControl', async (req, res) => {
    const documents = await Member.find().exec();
    console.log(documents);
    console.log(`total ${documents.length} item`)

    const mainData = {
        stage:login,
        crud:admin,
        count:cartCount,
        username:`Welcome ${user} !!!`,
        result: `Total result: ${documents.length} record`

    };
    const indexVariables = {
        member: documents,
        main: mainData
    }
    res.render('userList', { variables: indexVariables });
});

//search user method
app.post('/findUser', urlencodedParser, async (req, res) => {
    const username = req.body.findUser
    //dbconnection ("project");
    let documents
    if (username == ""){
        documents = await Member.find().exec();
    }else{
        documents = await Member.find({name: username}).exec(); 
    }
    const mainData = {
        stage:login,
        crud:admin,
        count:cartCount,
        username:`Welcome ${user} !!!`,
        result: `Total result: ${documents.length} record`

    };
    const indexVariables = {
        member: documents,
        main: mainData
    }
    res.render('userList', { variables: indexVariables });
});


//userUpdate end point
app.get('/userUpdate/:id', urlencodedParser, async (req, res) => {
    const selectedId = req.params.id;
    const document = await Member.findById(selectedId).exec();
    console.log(document);
    
    const mainData = {
        stage:login,
        crud:admin,
        count:cartCount,
        username:`Welcome ${user} !!!`
    };
    
    const indexVariables = {
        //stage: login,
        member: document,
        main: mainData
    }

    res.render('userUpdate', { variables: indexVariables });
});


//update user post method
app.post('/userUpdate', urlencodedParser, async (req, res) => {
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
        res.redirect('/userControl');
    }
    
});


//delete user method
app.get('/userDelete/:id', urlencodedParser, async (req, res) => {
    //internal scope of this function
    const idToDelete = req.params.id;
    
    //Delete object from database
    let result = await Member.deleteOne({ _id: idToDelete }).exec();
    console.log(result);
    res.redirect('/userControl');
});


//product view end point
app.get('/product', async (req, res) => {
    const documents = await Product.find().exec();
    console.log(documents);
    console.log(`total ${documents.length} item`)

    const mainData = {
        stage:login,
        crud:admin,
        count:cartCount,
        username:`Welcome ${user} !!!`
    };
    const indexVariables = {
        srw: documents,
        main: mainData
    }
    res.render('card', { variables: indexVariables });
});

//product detail view end point
app.get('/product/:id', async (req, res) => {
    const selectedId = req.params.id;
    const document = await Product.findById(selectedId).exec();
    console.log(document);
    
    const mainData = {
        stage:login,
        crud:admin,
        count:cartCount,
        username:`Welcome ${user} !!!`
    };
    const indexVariables = {
        //stage: login,
        srw: document,
        main: mainData
    }

    res.render('product', { variables: indexVariables });
});

//Create endpoint
app.get('/create', (req, res) => {
    const mainData = {
        stage:login,
        crud:admin,
        count:cartCount,
        username:`Welcome ${user} !!!`,
        title: "Create Product",
        url:"/newProduct"
    };
    const document = {}   
    
    const indexVariables = {
        main: mainData,
        srw: document
    }

    res.render('request', { variables: indexVariables });
})

//product create post method
app.post('/newProduct', upload.single('image'), async (req, res) => {   
    try{
        const newProduct = {
            code:req.body.pcode.toUpperCase(),
            name:req.body.pname.toUpperCase(),
            release:req.body.release.toUpperCase(),
            scale:req.body.scale.toUpperCase(),
            price:req.body.price,
            parts:req.body.part,
            material:req.body.material.toUpperCase(),
            image: req.file.filename
        }
        const product = new Product(newProduct);
        document = await product.save()
        console.log("data inserted : " + document);
    }catch(err){
        console.log("ERR: ", err);
    } finally {
        res.redirect('/product');
    }
});


//update product end point
app.get('/update/:id', async (req, res) => {
    try {
        const selectedId = req.params.id;
        const document = await Product.findById(selectedId).exec();
        
        const mainData = {
            stage:login,
            crud:admin,
            count:cartCount,
            username:`Welcome ${user} !!!`,
            title: "Update Product",
            url:"/updateProduct"
        };
        const indexVariables = {
            main: mainData,
            srw: document
        }
        
        res.render('request', { variables: indexVariables });
    } catch (err) {
        console.log("ERR: ", err)
    } 
});


//Update product post method
app.post('/updateProduct', upload.single('image'), async (req, res) => {
    try {
        const idToUpdate = req.body.id;

        //create the updateObject
        let updateObject = {
            code:req.body.pcode.toUpperCase(),
            name:req.body.pname.toUpperCase(),
            release:req.body.release.toUpperCase(),
            scale:req.body.scale.toUpperCase(),
            price:req.body.price,
            parts:req.body.part,
            material:req.body.material.toUpperCase(),
        }
        //logic to handle the image
        if (req.file) {
            console.log("Updating image");
            updateObject.image = req.file.filename;
        }
        //call update on database
        let filter = { _id: idToUpdate };

        //find the document and put in memory
        const document = await Product.findById(idToUpdate).exec(); 

        let result = await Product.updateOne(filter, updateObject).exec();
        if (result.ok > 0 && req.file) {
            // delete the image 
            deleteImage(document.image);  
        }
    } catch (err) {
        console.log("ERR: ", err);
    } finally {
        //redirect user to product view
        res.redirect('/product');
    }
});

//delete product endpoint
app.get('/delete/:id', async (req, res) => {
    //internal scope of this function
    const idToDelete = req.params.id;
    const document = await Product.findById(idToDelete).exec();
    //Delete the image
    deleteImage(document.image);
    //Delete object from database
    await Product.deleteOne({ _id: idToDelete }).exec();
    res.redirect('/product');
});


//set shopping cart
app.post('/cart', urlencodedParser, async (req, res) => {
    //internal scope of this function
    const postedId = req.body.id;
    const postedCode = req.body.code;
    const postedPrice = Number(req.body.price);
    const postedImage = req.body.image;
    let itemCheck = true;
    for (let i=0; i<cart.length; i++){
        if (cart[i].id == postedId){
            cart[i].qty += 1;
            cart[i].total += postedPrice
            itemCheck = false;
        }
    }
    if(itemCheck){
        console.log(`cart item: ${cart.length}`);
        const updateObject = {
            id:postedId,
            code:postedCode,
            price:postedPrice,
            image:postedImage,
            qty:1,
            total:postedPrice
        }
        cart.push(updateObject);
    }
    cartCount++;
    console.log(cart);
    console.log("cartCount :" + cartCount)
    
    res.send(cart);
});

//reduce cart item method
app.post('/reduceCart', urlencodedParser, async (req, res) => {
    //internal scope of this function
    const postedId = req.body.id;
    const postedCode = req.body.code;
    const postedPrice = Number(req.body.price);
    const postedImage = req.body.image;
    const postedQty = Number(req.body.qty);

    if (postedQty > 0){ 
        let itemCheck = true;
        for (let i=0; i<cart.length; i++){
            if (cart[i].id == postedId){
                cart[i].qty -= 1;
                cart[i].total -= postedPrice
                itemCheck = false;
            }
        }
        cartCount--;
        console.log(cart);
        console.log("cartCount :" + cartCount)
    }   
    res.send(cart);
});

//deleteC cart item method
app.post('/deleteCart', urlencodedParser, async (req, res) => {
    const postedId = req.body.id;
    const postedCode = req.body.code;
    const postedPrice = Number(req.body.price);
    const postedImage = req.body.image;
    const postedQty = Number(req.body.qty);
    const postedTotal = Number(req.body.total);

    for (let i=0; i<cart.length; i++){
        if (cart[i].id == postedId){
            cart.splice(i,1);
            console.log('array item deleted!')
            break;
            
        }
    }

    cartCount -= postedQty;
    console.log(cart);
    console.log("cartCount :" + cartCount)
    
    res.send(cart);
});


//shopping cart bill end point
app.get('/cart', urlencodedParser, async (req, res) => {
    
    let myCart = cart;
    let cartTotal = 0;
    
    for(let i=0; i < myCart.length; i++){
        
        cartTotal += myCart[i].total
    }
    console.log("total" + cartTotal)
    
    const VAT = Math.round(cartTotal * 0.05);
    const billTotal = VAT + cartTotal;


    const mainData = {
        stage:login,
        crud:admin,
        count:cartCount,  
        username:`Welcome ${user} !!!`,
        cart:myCart,
        sub:cartTotal, 
        vat:VAT,
        ttl:billTotal 
    };
    const indexVariables = {
        main: mainData,
    }
    res.render('cart',{ variables: indexVariables });
})



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});