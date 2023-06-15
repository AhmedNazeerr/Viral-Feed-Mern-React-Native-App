const mongoose = require('mongoose');
const headSchema = new mongoose.Schema({
    createdby: {
        email: String
    },
    headline: {
        type: String,
        required: true
    }
});

const Head = mongoose.model('Head', headSchema);

module.exports = Head;