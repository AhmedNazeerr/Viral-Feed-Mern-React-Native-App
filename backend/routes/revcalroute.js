const express = require('express');
const mongoose = require('mongoose');
const router = express.Router()
// const Student = mongoose.model('Student')
const Revcal=mongoose.model('RevCal')


//to add new post 
router.post('/revcalpost', async (req, res) => {
    const date = req.body.date
    const month = req.body.month
    const year = req.body.year
    const name = req.body.name
    const room = req.body.room
    const time = req.body.time
    console.log(date,month,year,name,room,time)

    try {
        const newRevcalEntry = new Revcal({
            calender: [
                {
                    date: date,
                    month: month,
                    year: year,
                    name: name,
                    room: room,
                    time: time
                }
            ]
        });
        await newRevcalEntry.save();
        console.log('Data added to revcal collection successfully');
        res.status(200).send("Worked")
    } catch (error) {
        console.error('Error adding data to revcal collection:', error);}
        
    

})

router.get('/revcalget', async (req, res) => {
    // try {
    //     const revcalData = await Revcal.find({}).exec();
    //     const calendars = revcalData.flatMap(doc => doc.calender)
    //     res.status(200).send(calendars)
    //     console.log('All data from revcal collection:',calendars);
    // } catch (error) {
    //     console.error('Error retrieving revcal data:', error);
    // }

    try {
        const revcalData = await Revcal.find({}).exec();
        const calendars = revcalData.flatMap(doc => {
            return doc.calender.map(calendar => {
                const id=doc._id
                const cal=calendar
                return ({id:id,cal:cal})
            });
        });

        console.log(calendars)
         res.status(200).send(calendars);
        console.log('All data from revcal collection:', calendars);
    } catch (error) {
        console.error('Error retrieving revcal data:', error);
    }

})


router.post('/delrevcal', async (req, res) => {
    const id = req.body.id
    const idx = new mongoose.Types.ObjectId(id);
    const id1 = new mongoose.Types.ObjectId(req.body.manid);
    console.log(id)
    console.log(id1)
    // try {
    //     const result = await Revcal.findByIdAndDelete(idx);
    //     console.log('Document deleted:', result);
    //     res.status(200).send("Deleted")
    // } catch (error) {
    //     console.error('Error deleting document:', error);
    // }

    // try {
    //     const result = await Revcal.findOneAndUpdate(
    //         { _id: id1 },
    //         { $pull: { calender: { _id: idx } } },
    //         { new: true }
    //     );

    //     console.log(result);
    //     res.status(200).send("Done")
    // } catch (error) {
    //     console.log(error);
    // }

    try {
        const deletedDocument = await Revcal.findByIdAndDelete(id1);

        if (!deletedDocument) {
            console.log('Document not found.');
        } else {
            res.send(200).status("Done")
            console.log('Document deleted successfully:', deletedDocument);
        }
    } catch (error) {
        console.error('Error deleting document:', error);
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