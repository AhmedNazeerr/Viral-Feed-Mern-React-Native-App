const express = require('express');
const mongoose = require('mongoose');
const router = express.Router()
const Resource = mongoose.model('Resource')
//to add new post 
router.post('/resource', async (req, res) => {
    const email = req.body.email
    const text = req.body.text
    const image = req.body.image
    console.log(email, text, image)
    if (email) {
            try {
                const post = new Resource({ email, text, image });
                await post.save();
                res.status(200).send("Sent")
            }
            catch (err) {
                res.status(422).send(err.message)
            }
        }
})


router.get('/allresource', async (req, res) => {
    Resource.find({}).exec()
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