const express = require('express');
const { Long } = require('mongodb');
const mongoose = require('mongoose');
const router = express.Router()
const multer = require("multer");
const Student = mongoose.model('Student')
const upload = multer({ dest: '../uploads' })


router.post('/signup',upload.single('profile') ,async (req, res) => {
    const email=req.body.email
    const name=req.body.name
    const password=req.body.password
    const role=req.body.role
    var imagename=req.body.image


    console.log(email, name, password,role,imagename)
    const student1 = await Student.findOne({ email }).lean()
    if (student1) {
        console.log("already registered")
        return res.status(200).send("Already Registered")
    }else{    // const imagename=req.body.imagename
    try {
        const student = new Student({ email, name, password,role,imagename });
        await student.save();
        res.status(200).send("Saved Successfully")
    }
    catch (err) {
        res.status(422).send(err.message)
    }
    }
})

router.post('/signin', async (req, res) => {
  
    console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).send("Must Provide Email or Password")
    }
    const student = await Student.findOne({ email }).lean()
    console.log(student)
    if (student) {
        if (student.password === password) {
            req.session.email = student.email
            req.session.role = student.role
            console.log(req.session)
            return res.status(200).send(student)
        }
        else {
            return res.status(422).send("no verification")
        }
      
    }
    else {
        return res.status(422).send("Must Provide Email or Password")
    }
})


router.post('/signout', (req, res) => {
    req.session.destroy();
    return res.status(200).send("Successfully")
})

module.exports = router;