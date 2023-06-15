const express = require('express');
const mongoose = require('mongoose');
const router = express.Router()
const Student = mongoose.model('Student')


//to add new post 
router.post('/calpost', async (req, res) => {

    const email = req.body.email
    const date = req.body.date
    const month = req.body.month
    const year = req.body.year
    const todo = req.body.todo
    console.log(email, date, month, year, todo)
    if (email) {
        const student1 = await Student.findOne({ email }).lean()
        if (student1) {
            console.log("Student is present", student1)
            try {
                await Student.findOneAndUpdate({ email: email }, { $push: { calender: { date: date, month: month, year: year, todo: todo } } });
                res.status(200).send("Saved Successfully")
            }
            catch (err) {
                res.status(422).send(err.message)
            }
        }
    }

})

router.post('/calhourres', async (req, res) => {

    const studentemail = req.body.studentemail
    const facultyemail = req.body.facultyemail
    const date = req.body.date
    const month = req.body.month
    const year = req.body.year
    const timeslot = req.body.timeslot
    var email = studentemail

    console.log(studentemail, facultyemail, date, month, year, timeslot)
    if (email) {
        const student1 = await Student.findOne({ email }).lean()
        if (student1) {
            email = facultyemail
            const student2 = await Student.findOne({ email }).lean()

            console.log("faculty email is present", student2)
            try {
                await Student.findOneAndUpdate({ email: studentemail }, { $push: { reservedhour: { studentemail: studentemail, facultyemail: facultyemail, date: date, month: month, year: year, timeslot: timeslot } } });
                await Student.findOneAndUpdate({ email: facultyemail }, { $push: { reservedhour: { studentemail: studentemail, facultyemail: facultyemail, date: date, month: month, year: year, timeslot: timeslot } } });
                res.status(200).send("Saved Successfully")
            }
            catch (err) {
                res.status(422).send(err.message)
            }

        }
    }

})

router.post('/calget', async (req, res) => {

    const email = req.body.email
    const date = req.body.date
    const month = req.body.month
    const year = req.body.year
    const todo = req.body.todo
    console.log(email, date, month, year, todo)
    if (email) {
        const student1 = await Student.findOne({ email }).lean()
        if (student1) {
            const commonObjects = student1.calender.filter(obj => obj.date === date && obj.month === month && obj.year === year);
            console.log(commonObjects)
            res.status(200).send(commonObjects)
        }
        else {
            console.log("no data")
        }
    }

})



router.post('/caltimeget', async (req, res) => {
    const email = req.body.email
    const date = req.body.date
    const month = req.body.month
    const year = req.body.year
    console.log(email, date, month, year)
    if (email) {
        const student1 = await Student.findOne({ email }).lean()
        if (student1) {
            const commonObjects = student1.reservedhour.filter(obj => obj.date === date && obj.month === month && obj.year === year);
            console.log(commonObjects)
            res.status(200).send(commonObjects)
        }
        else {
            console.log("no data")
        }
    }

})



// router.get('/allp', async (req, res) => {
//     Post.find({}).exec()
//         .then(data => {
//             console.log(data);
//             res.status(200).send(data)// 'data' will contain an array of all documents in the collection
//         })
//         .catch(err => {
//             console.error(err);
//             res.status(422).send(err.message)
//         });
// })


module.exports = router;