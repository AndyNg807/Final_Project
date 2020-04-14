//This is what you use to have multipart form data
const multer = require('multer'); //npm install multer (用這個可不用body-parser)html form 要用enctype="multipart/form-data"
// SET STORAGE
var storage = multer.diskStorage({  //這個"storage"為放在"const upload = multer({ storage: storage });"中的變數
    destination: function (req, file, cb) {  //file為上傳file的相闗資料, cd = call back function
        cb(null, 'public/img/product')  //接收upload file的folder,而第一個的null是error的call back?
    },
    filename: function (req, file, cb) {  //設定上傳file的名字
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)  //Date.now() 方法回傳自 1970/01/01 00:00:00 UTC 起經過的毫秒數。 e.g. 1583547342452
    }
})
 //destination和filename函式的引數req，在這裡req.body是空物件{}，未裝載formdata的文字域資料。ref:https://www.itread01.com/content/1549466124.html
 const upload = multer({ storage: storage }); //第一個storage:為key(指定寫法), 如只是簡單的upload儲存可用dest:代替, 第二個storage為變數.
 

module.exports = upload;