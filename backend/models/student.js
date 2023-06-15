const mongoose=require('mongoose');
const studentSchema= new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type: String,
        required: true
    },
    imagename:{
        type:String
    },
    society: [
        {
            societyname: {
                type: String
            }
        }
    ],
    yourpost:[
        {
            postid:{
                type:String
            }
        }
    ],
    calender: [
        {
            date:{
               type:String
            },
            month:{
                 type:String
            },
            year:{
                type:String

            },
            todo:{
                type:String
            }

        }
    ],
    poll: [
        {
            created: {
                type: String
            }
        }
    ],
    pollvoted: [
        {
            poll:{
                type:String
            },
            which: {
                type: String
            },
            answer:{
                type:String
            }
        }
    ],
    reservedhour: [
        {
            studentemail:{
                    type:String
            },
            facultyemail:{
                type:String
            },
            date: {
                type: String
            },
            month: {
                type: String
            },
            year: {
                type: String

            },
            timeslot:{
                type:String
            }
        }
    ]
})

mongoose.model('Student',studentSchema);