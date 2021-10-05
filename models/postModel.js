//A schema for the post object
const mongoose = require('mongoose');
const { use } = require('../controllers/userRouter');

const postSchema = new mongoose.Schema({
    body: {type:String},
    author: {type:String},
    likesById:{}
})

const post = mongoose.model('post',postSchema);

module.exports= post;