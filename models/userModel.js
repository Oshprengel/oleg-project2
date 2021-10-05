//A schema for the user object
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type:String, unique:true},
    password: {type:String},
    postsById:{}
})

const User = mongoose.model('User',userSchema);

module.exports= User;