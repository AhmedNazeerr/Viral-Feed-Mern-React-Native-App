const express = require('express');
const mongoose = require('mongoose');
const router = express.Router()
const Head = mongoose.model('Head')
const Student = mongoose.model('Student')



//to add new post 
router.post('/chead', async (req, res) => {
    const createdby = req.body.email
    const headline = req.body.text
    console.log(createdby,headline)
            console.log("Student is present")
            try {
                const post = new Head({ createdby, headline });
                await post.save();
                    res.status(200).send("done")
                    // No objects found in the collection
            } catch (err) {
                res.status(422).send(err.message)
            }

})


router.get('/allh', async (req, res) => {
    Head.find({}).exec()
        .then(data => {
            console.log(data);
            res.status(200).send(data)// 'data' will contain an array of all documents in the collection
        })
        .catch(err => {
            console.error(err);
            res.status(422).send(err.message)
        });
})


module.exports = router;