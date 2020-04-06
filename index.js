const express = require('express');
const app = express();
const fs = require('fs');
const port = process.env.PORT ||3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const urlencodedParser = bodyParser.urlencoded({ extended: false }); 
//let uri = "mongodb+srv://node-site-example:node-site-example1234@cluster0-1regk.mongodb.net/comics?retryWrites=true&w=majority";


//Databas connection
let uri = "mongodb://localhost:27017/project";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//Middlewares
app.set('view engine', 'pug'); //Setting up pug as template engine
app.use('/', express.static('public'));


//Mongoose Model (Work as a Schema)
const Member = require('./modules/member');
const Product = require('./modules/product');


//This is what you use to have multipart form data
const multer = require('multer');
// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img/product')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage: storage });

//set global variable
let login = false;
let admin = false;
let user = "user";
let cart = [];
let cartCount = 0;





//register end point
app.get('/register', (req, res) => {
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
    res.render('register',{ variables: indexVariables });
})

//register post method
app.post('/addUser', urlencodedParser, async (req, res) => {
    //internal scope of this function
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
})

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

    const result = {"cart":cart};
    
    res.send(result);
});


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

        const result = {"cart":cart};
    }   
    res.send(result);
});


app.post('/deleteCart', urlencodedParser, async (req, res) => {
    //internal scope of this function
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
   
    /*    
    const deleteObject = {
        id:postedId,
        code:postedCode,
        price:postedPrice,
        image:postedImage,
        qty:postedQty,
        total:postedTotal
    }
    const index = cart.indexOf(deleteObject);
    if(index >-1){
        cart.splice(index,1);
    }
*/

    cartCount -= postedQty;
    console.log(cart);
    console.log("cartCount :" + cartCount)

    const result = {"cart":cart};
    
    res.send(result);
});



app.get('/cart', urlencodedParser, async (req, res) => {
    
    //let myJson = JSON.stringify(cart);
    //let myCart = JSON.parse(`{"results":${myJson}}`);
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
        count:cartCount,   //購物車貨品
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


app.get('/logout', async (req, res) => {
    //internal scope of this function
    try{
       
        document = await Member.find({name: user}).exec(); 
        console.log(document)
        console.log(`user ${document[0].name} logout`);
        login = false;
        admin = false;
        user = "user";
        cart = [];
        cartCount = 0;
        console.log(`login:${login}, admin:${admin}, user:${user}`);
    }catch(err){
        console.log("ERR: ", err);
    } finally {
        res.redirect('/');
    }
    
    /*
    const mainData = {
        stage:login,
        crud:admin,
        username:`Welcome ${user} !!!`       
    };
    const indexVariables = {
        main: mainData,
    }
    */
  
   
})


//fetch
app.post('/dataCheck', urlencodedParser, async (req, res) => {
    const username = req.body.username
    //dbconnection ("project");
    documents = await Member.find({name: username}).exec(); 
    res.send(documents);
});

//admin userControl
app.get('/userControl', async (req, res) => {
    //internal scope of this function
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

//search user
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

//userUpdate
app.get('/userUpdate/:id', urlencodedParser, async (req, res) => {
    //internal scope of this function
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


//delete user end point
app.get('/userDelete/:id', urlencodedParser, async (req, res) => {
    //internal scope of this function
    const idToDelete = req.params.id;
    
    //Delete object from database
    let result = await Member.deleteOne({ _id: idToDelete }).exec();
    console.log(result);
    res.redirect('/userControl');
});










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


app.get('/about', (req, res) => {
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

    res.render('about', { variables: indexVariables });
})






app.get('/product', async (req, res) => {
    //internal scope of this function
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

//detail view
app.get('/product/:id', async (req, res) => {
    //internal scope of this function
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
    //internal scope of this function
    const mainData = {
        stage:login,
        crud:admin,
        count:cartCount,
        username:`Welcome ${user} !!!`,
        title: "Create Product",
        url:"/newProduct"
    };
    const document = {}   //因應下頁(request.pug)的設定, 要加上這個空值,否則會error;
    
    const indexVariables = {
        main: mainData,
        srw: document
    }

    res.render('request', { variables: indexVariables });
})

//Create post method
app.post('/newProduct', upload.single('image'), async (req, res) => {   //"image"為html form中file type中所定義的name
    //internal scope of this function
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
              
        //DBconnect ("project");
        document = await product.save()
        console.log("data inserted : " + document);
    }catch(err){
        console.log("ERR: ", err);
    } finally {
        res.redirect('/product');
    }
});


//update view
app.get('/update/:id', async (req, res) => {
    try {
        //internal scope of this function
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
        const document = await Product.findById(idToUpdate).exec(); //作用為先取回要delete的file name;

        let result = await Product.updateOne(filter, updateObject).exec();
        if (result.ok > 0 && req.file) {
            // delete the image 
            deleteImage(document.image);  //自定義function
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






function deleteImage(image){
    const dir = __dirname + "/public/img/product/" + image;
    if (fs.existsSync(dir)) {
        fs.unlink(dir, (err) => {
            if (err) throw err;
            console.log(`successfully deleted ${image} from folder product`);
        });
    }
}

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});