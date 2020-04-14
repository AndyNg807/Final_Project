//delete img file script
const fs = require('fs'); //node.js內帶的文件系統的api
const path = require('path'); //用於指定path或file所在位置 e.g. sendFile(path.join(__dirname, 'index.html')) (node.js內帶api)

const deleteImage = function(image){
    //const dir = "./../public/img/product/" + image; //這個為錯誤寫法;
    const dir = path.join(__dirname, "../public/img/product/" + image);
    console.log(`dir : ${dir}`)
    console.log('__dirname：' +  __dirname) //回傳被執行 js 檔所在資料夾的絕對路徑
    console.log('__filename：'+ __filename) //回傳被執行 js 檔的絕對路徑(包含這js file名稱)
    if (fs.existsSync(dir)) {     //如"dir"這變數中的file存在
        fs.unlink(dir, (err) => {  //fs.unlink()為刪除文件,這是異步寫法, 另同步(完成一個程式後才進签另一個程式)寫法為"fs.unlinkSync()";
            if (err) throw err;
            console.log(`successfully deleted ${image} from folder product`);
        });
    }else{
        console.log(`no any file deleted`);
    }
}

module.exports = deleteImage;