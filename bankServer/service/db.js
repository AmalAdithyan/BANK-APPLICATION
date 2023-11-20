//import mongoose
const mongoose = require("mongoose")

//state conection string
mongoose.connect('mongodb://127.0.0.1:27017/bankServer', { useNewUrlParser: true });
//this is how you create a connection string
//useNewParser integration cheyyanm connction help okke cheyunnath parser enn parayunna sambavam anu ini parserine endhenglum errors okke 
// varunnath avoid cheyyan mongoose.connectinde koode useNewUrlParser koode pass cheyanam to avoid any parser related errors.and true ayi kodukkanam

//model(schema) creation //schema means fields and values

const User = mongoose.model('User'/*ithinde akath modeline endh name ano koduthath ath thamne kodukkanam */, {
    acno: Number,
    username: String,
    password: String,
    balance: Number,
    transaction :[]
}) //model name must be singular form of collection name and first letter should be capital 
module.exports = {
    User
}