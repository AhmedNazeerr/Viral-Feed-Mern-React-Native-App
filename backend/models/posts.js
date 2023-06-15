const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    creatorimage:{
        type:String
    }
   
})

mongoose.model('Post', postSchema);