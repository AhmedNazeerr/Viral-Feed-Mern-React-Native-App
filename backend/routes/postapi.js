const express = require('express');
const mongoose = require('mongoose');
const router = express.Router()
const Post = mongoose.model('Post')
const Student = mongoose.model('Student')



//to add new post 
router.post('/post', async (req, res) => {

    const email = req.body.email
    const text = req.body.text
    const image = req.body.image
    console.log(email, text, image)

    if (email) {
        const student1 = await Student.findOne({ email }).lean()
        if (student1) {
            console.log("Student is present", student1)
            try {
                var creatorimage = student1.imagename
                const post = new Post({ email, text, image, creatorimage });
                await post.save();

                const lastObject = await Post.findOne({}, '_id').sort({ _id: -1 }).exec();
                if (lastObject) {
                    const lastObjectId = lastObject._id;
                    // Use the last object ID as needed
                    await Student.findOneAndUpdate({ email: email }, { $push: { yourpost: { postid: lastObjectId } } });
                    res.status(200).send("Saved Successfully")
                } else {
                    res.status(422).send("unable to get the last id")
                    // No objects found in the collection
                }

            }
            catch (err) {
                res.status(422).send(err.message)
            }
        }
    }

})


router.get('/allp', async (req, res) => {
    Post.find({}).exec()
        .then(data => {
            res.status(200).send(data)// 'data' will contain an array of all documents in the collection
        })
        .catch(err => {
            console.error(err);
            res.status(422).send(err.message)
        });
})


module.exports = router;