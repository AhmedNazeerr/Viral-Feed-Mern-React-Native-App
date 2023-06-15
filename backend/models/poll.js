const mongoose = require('mongoose');
const PollSchema = new mongoose.Schema({
    createdby:{
        email:String
    },
    question: {
        type: String,
        required: true
    },
    options: [
        { option:{
            type: String, default: 0
        },
        selected:{
            type:Number
        }
    }
]
});

const Poll = mongoose.model('Poll', PollSchema);

module.exports = Poll;