const mongoose = require('mongoose');
const revcalSchema = new mongoose.Schema({
    calender: [
        {
            date: {
                type: String
            },
            month: {
                type: String
            },
            year: {
                type: String

            },
            name: {
                type: String
            },
            room:{
                type:String
            },
            time:{
                type:String
            },
            authentic:{
                type:String
            }

        }
    ]
})

mongoose.model('RevCal', revcalSchema);