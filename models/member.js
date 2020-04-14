const mongoose = require('mongoose'); //npm install mongoose

//Mongoose Model (Work as a Schema)
const Member = mongoose.model('login', {
    name: String, //設定為"name"可以使用 schema.query.byName = ...的自定義功能
    password: String,
    email: String,
    admin: Boolean
},'login');

module.exports = Member;
//model('xxx', schema, 'yyyy') -> 預設xxx加上s為collection name 'xxxs', 如不想加上s, 可加上'yyyy'為collection name;
//mongoose.model("模型名称", Scheme, "Collection名称(可选)")
//如果未传第三个参数指定Collection集合名称。则Mongoose会将Collection集合名称设置为模型名称的小写版。
//如果名称的最后一个字符是字母，则会变成复数；如果名称的最后一个字符是数字，则不变。例如，如果模型名称为MyModel，
//则集合名称为mymodels；如果模型名称为Model1，则集合名称为model1。

/*
另一寫法如下:

const schema = mongoose.Schema;
const login = new schema({
    name: String,   //設定為"name"可以使用 schema.query.byName = ...的自定義功能
    password: String,
    email: String,
    admin: Boolean}
);

const member = mongoose.model('login', login, 'login'); 

*/