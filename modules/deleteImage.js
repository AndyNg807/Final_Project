//delete img file script
const deleteImage = function(image){
    const dir = __dirname + "/public/img/product/" + image;
    if (fs.existsSync(dir)) {
        fs.unlink(dir, (err) => {
            if (err) throw err;
            console.log(`successfully deleted ${image} from folder product`);
        });
    }
}

module.exports = deleteImage;