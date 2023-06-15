const mongoose = require('mongoose');
const ResourceSchema = new mongoose.Schema({
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
    }

})

mongoose.model('Resource', ResourceSchema);