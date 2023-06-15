const express = require('express');
const mongoose = require('mongoose');
const router = express.Router()
const Poll = mongoose.model('Poll')
const Student = mongoose.model('Student')



//to add new post 
router.post('/pollpost', async (req, res) => {
    // console.log(req.body)
    console.log(req.body)
    var { email, newPollQuestion, newPollOptions } = (req.body);
    var createdby = email
    var question = newPollQuestion
    var option = [...newPollOptions]
    const options = option.map(option => option.label);
    console.log(options)

    if (email) {
        const student1 = await Student.findOne({ email }).lean()
        if (student1) {
            console.log("Student is prt")
            try {
                const newPollData = {
                    createdby: {
                        email: createdby
                    },
                    question: question,
                    options: options.map(option => ({ option }))
                };
                const post = new Poll(newPollData);
                await post.save();
                res.status(200).send("Saved Successfully")
            }
            catch (err) {
                res.status(422).send(err.message)
            }
        }
    }
})

router.get('/allpoll', (req, res) => {
    Poll.find({}).exec()
        .then(data => {
            console.log(data);
            res.status(200).send(data)
        })
        .catch(err => {
            console.error(err);
            res.status(422).send(err.message)
        });
})


// router.post('/pollset', async (req, res) => {
//     const email = req.body.email
//     const pollid = req.body.pollid
//     const optionid = req.body.id
//     console.log(email, pollid, optionid)
//     if (email) {
//         const student1 = await Student.findOne({ email }).lean()
//         if (student1) {
//             console.log("Student is available")
//             const optionObjectId = new mongoose.Types.ObjectId(optionid);
//             const pollObjectId = new mongoose.Types.ObjectId(pollid);

//             Poll.findOne({ 'options._id': optionObjectId })
//                 .then((poll) => {
//                     if (poll) {
//                         const option = poll.options.find((o) => o._id.equals(optionObjectId));
//                         const answer = option.option
//                         const pollid = pollObjectId
//                         var which = optionObjectId
//                        // which = new mongoose.Types.ObjectId(optionObjectId);
//                         console.log(answer, pollid, which)
//                         if (option) {
//                             Student.findOne({
//                                 'email':email,
//                                 'pollvoted.poll': pollid,
//                                 'pollvoted.which': which
//                             })
//                                 .then((student) => {
//                                     if (student) {
//                                         console.log('Poll and option IDs match in the student document');

//                                     } else {
//                                         console.log('Poll and option IDs do not match in the student document');

//                                         Student.findOne({ email, 'pollvoted.poll': pollid })
//                                             .then((student) => {
//                                                 if (student) {
//                                                     //Student found and has the given pollid
//                                                     console.log('Student has the given pollid already updating the poll answwer');
//                                                     const pollvotedEntry = student.pollvoted.find((entry) => entry.poll === pollid);
//                                                         whichValue = new mongoose.Types.ObjectId(pollvotedEntry.which);
//                                                         console.log("Which value: previsoulsy slected poll id", whichValue);
//                                                         console.log("Which value: new selectedted poll id", which);

//                                                     Student.updateMany(
//                                                         {"email":email, "pollvoted.poll": pollid },
//                                                         { $unset: { "pollvoted.$[elem].which": "", "pollvoted.$[elem].answer": "" } },
//                                                         { arrayFilters: [{ "elem.poll": pollid }] }
//                                                     )
//                                                         .then((student) => {
//                                                             if (student) {
//                                                                 // Student found and updated
//                                                                 console.log('Previous pollvoted entries deleted:');
//                                                                 Poll.findById(whichValue)
//                                                                     .then((poll) => {
//                                                                         console.log("old value has been decremented");
//                                                                         if (poll) {
//                                                                             const selectedOptionIndex = poll.options.findIndex((option) => option._id.equals(new mongoose.Types.ObjectId(whichValue)));
//                                                                             if (selectedOptionIndex !== -1) {
//                                                                                 console.log(selectedOptionIndex);
//                                                                                 // Decrement the selected value by 1
//                                                                                 poll.options[selectedOptionIndex].selected -= 1;
//                                                                                 // Save the updated poll and return the promise
//                                                                                 return poll.save();
//                                                                             }
//                                                                         }
//                                                                     })
//                                                                     .then((updatedPoll) => {
//                                                                         if (updatedPoll) {
//                                                                             console.log("Poll updated:", updatedPoll);
//                                                                         } else {
//                                                                             console.log("Selected option not found in the poll.");
//                                                                         }
//                                                                     })
//                                                                     .catch((error) => {
//                                                                         console.error("Error:", error);
//                                                                     });            


//                                                                 Student.updateMany(
//                                                                     { "email":email,"pollvoted.poll": pollid },
//                                                                     { $set: { "pollvoted.$[elem].which": which, "pollvoted.$[elem].answer": answer } },
//                                                                     { arrayFilters: [{ "elem.poll": pollid }] }
//                                                                 )
//                                                                     .then((ult) => {

//                                                                         console.log('Student has been assigned new poll data');


//                                                                         Poll.findById(pollid)
//                                                                             .then((poll) => {
//                                                                                 if (poll) {
//                                                                                     const selectedOptionIndex = poll.options.findIndex((option) => option._id.equals(new mongoose.Types.ObjectId(optionObjectId)));

//                                                                                     if (selectedOptionIndex !== -1) {
                                                                                    
//                                                                                         console.log(selectedOptionIndex)
//                                                                                         //Update selected and other options
//                                                                                         poll.options = poll.options.map((option, index) => {
                                                                                           
//                                                                                             if (isNaN(option.selected)) {
//                                                                                                 option.selected = 0
//                                                                                             }
//                                                                                             if (index === selectedOptionIndex) {
//                                                                                                 return { ...option, selected: option.selected + 1 };

//                                                                                             } else {
//                                                                                                 if (option.selected === 0) {
//                                                                                                     return { ...option, selected: 0 };

//                                                                                                 }
//                                                                                                 else {
//                                                                                                     return { ...option, selected: option.selected - 1 };

//                                                                                                 }

//                                                                                             }
//                                                                                         })
//                                                                                         return poll.save();
//                                                                                     } else {
//                                                                                         // Selected option not found in the poll
//                                                                                         throw new Error('Selected option not found');
//                                                                                     }
//                                                                                 } else {
//                                                                                     // Poll not found
//                                                                                     throw new Error('Poll not found');
//                                                                                 }

//                                                                             })
//                                                                             .then((updatedPoll) => {
//                                                                                 console.log('Poll updated:');
//                                                                             })
//                                                                             .catch((err) => {
//                                                                                 console.error('Error:', err);
//                                                                             });

//                                                                     })
//                                                                     .catch((error) => {
//                                                                         console.error('Error deleting previous pollvoted entries:', error);
//                                                                     });
//                                                             } else {
//                                                                 //  Student not found
//                                                                 console.log('Student not found');
//                                                             }
//                                                         })
//                                                         .catch((error) => {
//                                                             //Handle error
//                                                             console.error(error);
//                                                         });

//                                                 } else {
//                                                     //Student not found or does not have the given pollid
//                                                     console.log('Student not found or does not have the given pollid');

//                                                     Student.findOneAndUpdate(
//                                                         { email },
//                                                         {
//                                                             $addToSet: {
//                                                                 pollvoted: { poll: pollid, which: which, answer: answer }
//                                                             }
//                                                         }
//                                                     )
//                                                         .then((student) => {
//                                                             if (student) {
//                                                                 //Student found and updated
//                                                                 console.log('Student:');

//                                                                 Poll.findById(pollid)
//                                                                     .then((poll) => {
//                                                                         if (poll) {
//                                                                             const selectedOptionIndex = poll.options.findIndex((option) => option._id.equals(new mongoose.Types.ObjectId(optionObjectId)));

//                                                                             if (selectedOptionIndex !== -1) {
//                                                                                 console.log(selectedOptionIndex)
//                                                                                 //Update selected and other options
//                                                                                 poll.options = poll.options.map((option, index) => {
//                                                                                          if (selectedOptionIndex === index) {
//                                                                                                 console.log(selectedOptionIndex);
//                                                                                                 //Decrement the selected value by 1
//                                                                                                 poll.options[selectedOptionIndex].selected += 1;
//                                                                                                 //Save the updated poll and return the promise
//                                                                                                 return poll.save();
//                                                                                             }
//                                                                                     // if (isNaN(option.selected)) {
//                                                                                     //     option.selected = 0
//                                                                                     // }
//                                                                                     // if (index === selectedOptionIndex) {
//                                                                                     //     console.log(index)
//                                                                                     //     console.log(selectedOptionIndex)
//                                                                                     //     return { ...option, selected: option.selected + 1 };

//                                                                                     // } else {
//                                                                                     //     if (option.selected === 0) {
//                                                                                     //         return { ...option, selected: 0 };
//                                                                                     //     }
//                                                                                     //     else {
//                                                                                     //         return { ...option, selected: option.selected - 1 };

//                                                                                     //     }

//                                                                                     // }
//                                                                                 })
//                                                                                 //return poll.save();

//                                                                             } else {
//                                                                                 // Selected option not found in the poll
//                                                                                 throw new Error('Selected option not found');
//                                                                             }
//                                                                         } else {
//                                                                             // Poll not found
//                                                                             throw new Error('Poll not found');
//                                                                         }
//                                                                     })
//                                                                     .then((updatedPoll) => {
//                                                                         console.log('Poll updated:');
//                                                                     })
//                                                                     .catch((err) => {
//                                                                         console.error('Error:', err);
//                                                                     });


//                                                             } else {
//                                                                 // Student not found
//                                                                 console.log('Student not found');
//                                                             }
//                                                         })
//                                                         .catch((error) => {
//                                                             //  Handle error
//                                                             console.error(error);
//                                                         });

//                                                 }
//                                             })
//                                             .catch((error) => {
//                                                 // Handle error
//                                                 console.error(error);
//                                             });

//                                     }
//                                 })
//                                 .catch((err) => {
//                                     console.error('Error:', err);
//                                 });
//                         }
//                     }
//                 })
//                 .catch((err) => {
//                     // Handle error
//                 });
//         }
//         res.send(200).status("okay")
//     }

// })


// router.post('/pollset', async (req, res) => {
//     const email = req.body.email
//     const pollid = req.body.pollid
//     const optionid = req.body.id
//     console.log(email, pollid, optionid)
//     if (email) {
//         const student1 = await Student.findOne({ email }).lean()
//         if (student1) {
//             console.log("Student is available")
//             const optionObjectId = new mongoose.Types.ObjectId(optionid);
//             const pollObjectId = new mongoose.Types.ObjectId(pollid);

//             Poll.findOne({ 'options._id': optionObjectId })
//                 .then((poll) => {
//                     if (poll) {
//                         const option = poll.options.find((o) => o._id.equals(optionObjectId));
//                         const answer = option.option
//                         const pollid = pollObjectId
//                         const which = optionObjectId
//                         console.log(answer, pollid, which)
//                         if (option) {
//                             Student.findOne({
//                                 'pollvoted.poll': pollid,
//                                 'pollvoted.which': which
//                             })
//                                 .then((student) => {
//                                     if (student) {
//                                         console.log('Poll and option IDs match in the student document');

//                                     } else {
//                                         console.log('Poll and option IDs do not match in the student document');

//                                         Student.findOne({ email, 'pollvoted.poll': pollid })
//                                             .then((student) => {
//                                                 const whichValue = pollid
//                                                 if (student) {
//                                                     Student found and has the given pollid
//                                                     console.log('Student has the given pollid already updating the poll answwer');
//                                                     const pollvotedEntry = student.pollvoted.find((entry) => entry.poll === pollid);
//                                                     if (pollvotedEntry) {
//                                                         whichValue = new mongoose.Types.ObjectId(pollvotedEntry.which);
//                                                         console.log("Which value:", whichValue);
//                                                     }

//                                                     Student.updateMany(
//                                                         { "pollvoted.poll": pollid },
//                                                         { $unset: { "pollvoted.$[elem].which": "", "pollvoted.$[elem].answer": "" } },
//                                                         { arrayFilters: [{ "elem.poll": pollid }] }
//                                                     )
//                                                         .then((student) => {
//                                                             if (student) {
//                                                                 Student found and updated
//                                                                 console.log('Previous pollvoted entries deleted:');
//                                                                 Poll.findById(whichValue)
//                                                                     .then((poll) => {
//                                                                         console.log("old value has been decremented");
//                                                                         if (poll) {
//                                                                             const selectedOptionIndex = poll.options.findIndex((option) => option._id.equals(new mongoose.Types.ObjectId(whichValue)));
//                                                                             if (selectedOptionIndex !== -1) {
//                                                                                 console.log(selectedOptionIndex);
//                                                                                 Decrement the selected value by 1
//                                                                                 poll.options[selectedOptionIndex].selected -= 1;
//                                                                                 Save the updated poll and return the promise
//                                                                                 return poll.save();
//                                                                             }
//                                                                         }
//                                                                     })
//                                                                     .then((updatedPoll) => {
//                                                                         if (updatedPoll) {
//                                                                             console.log("Poll updated:", updatedPoll);
//                                                                         } else {
//                                                                             console.log("Selected option not found in the poll.");
//                                                                         }
//                                                                     })
//                                                                     .catch((error) => {
//                                                                         console.error("Error:", error);
//                                                                     });                       // Poll.findById(whichValue)
//                                                                     .then((poll) => {
//                                                                         console.log("old value has been decremented")
//                                                                         if (poll) {
//                                                                             const selectedOptionIndex = poll.options.findIndex((option) => option._id.equals(new mongoose.Types.ObjectId(whichValue)));
//                                                                             if (selectedOptionIndex !== -1) {
//                                                                                      console.log(selectedOptionIndex)
//                                                                                 //Update selected and other options
//                                                                                 poll.options = poll.options.map((option, index) => {
//                                                                                     if (index === selectedOptionIndex) {
//                                                                                         return { ...option, selected: option.selected - 1 };

//                                                                                     } else {
//                                                                                         if (option.selected === 0) {
//                                                                                             return { ...option, selected: 0 };
//                                                                                         }
//                                                                                         else {
//                                                                                             return { ...option, selected: option.selected + 1 };

//                                                                                         }

//                                                                                     }
//                                                                                 })
//                                                                             }
//                                                                         }
//                                                                         poll.save()
//                                                                     })
//                                                                     .catch((err) => {
//                                                                         console.log(err)
//                                                                     })
//                                                                 Student.updateMany(
//                                                                     { "pollvoted.poll": pollid },
//                                                                     { $set: { "pollvoted.$[elem].which": which, "pollvoted.$[elem].answer": answer } },
//                                                                     { arrayFilters: [{ "elem.poll": pollid }] }
//                                                                 )
//                                                                     .then((ult) => {

//                                                                         console.log('Student has been assigned new poll data');


//                                                                         Poll.findById(pollid)
//                                                                             .then((poll) => {
//                                                                                 if (poll) {
//                                                                                     const selectedOptionIndex = poll.options.findIndex((option) => option._id.equals(new mongoose.Types.ObjectId(optionObjectId)));

//                                                                                     if (selectedOptionIndex !== -1) {
                                                                                    
//                                                                                         console.log(selectedOptionIndex)
//                                                                                         Update selected and other options
//                                                                                         poll.options = poll.options.map((option, index) => {
//                                                                                             if (isNaN(option.selected)) {
//                                                                                                 option.selected = 0
//                                                                                             }
//                                                                                             if (index === selectedOptionIndex) {
//                                                                                                 return { ...option, selected: option.selected + 1 };

//                                                                                             } else {
//                                                                                                 if (option.selected === 0) {
//                                                                                                     return { ...option, selected: 0 };

//                                                                                                 }
//                                                                                                 else {
//                                                                                                     return { ...option, selected: option.selected - 1 };

//                                                                                                 }

//                                                                                             }
//                                                                                         })
//                                                                                         return poll.save();
//                                                                                     } else {
//                                                                                         Selected option not found in the poll
//                                                                                         throw new Error('Selected option not found');
//                                                                                     }
//                                                                                 } else {
//                                                                                     Poll not found
//                                                                                     throw new Error('Poll not found');
//                                                                                 }

//                                                                             })
//                                                                             .then((updatedPoll) => {
//                                                                                 console.log('Poll updated:');
//                                                                             })
//                                                                             .catch((err) => {
//                                                                                 console.error('Error:', err);
//                                                                             });

//                                                                     })
//                                                                     .catch((error) => {
//                                                                         console.error('Error deleting previous pollvoted entries:', error);
//                                                                     });
//                                                             } else {
//                                                                  Student not found
//                                                                 console.log('Student not found');
//                                                             }
//                                                         })
//                                                         .catch((error) => {
//                                                             Handle error
//                                                             console.error(error);
//                                                         });

//                                                 } else {
//                                                     Student not found or does not have the given pollid
//                                                     console.log('Student not found or does not have the given pollid');

//                                                     Student.findOneAndUpdate(
//                                                         { email },
//                                                         {
//                                                             $addToSet: {
//                                                                 pollvoted: { poll: pollid, which: which, answer: answer }
//                                                             }
//                                                         },
//                                                         { new: true }
//                                                     )
//                                                         .then((student) => {
//                                                             if (student) {
//                                                                 Student found and updated
//                                                                 console.log('Student:');

//                                                                 Poll.findById(pollid)
//                                                                     .then((poll) => {
//                                                                         if (poll) {
//                                                                             const selectedOptionIndex = poll.options.findIndex((option) => option._id.equals(new mongoose.Types.ObjectId(optionObjectId)));

//                                                                             if (selectedOptionIndex !== -1) {
//                                                                                 console.log(selectedOptionIndex)
//                                                                                 Update selected and other options
//                                                                                 poll.options = poll.options.map((option, index) => {
//                                                                                     if (isNaN(option.selected)) {
//                                                                                         option.selected = 0
//                                                                                     }
//                                                                                     if (index === selectedOptionIndex) {
//                                                                                         return { ...option, selected: option.selected + 1 };

//                                                                                     } else {
//                                                                                         if (option.selected === 0) {
//                                                                                             return { ...option, selected: 0 };
//                                                                                         }
//                                                                                         else {
//                                                                                             return { ...option, selected: option.selected - 1 };

//                                                                                         }

//                                                                                     }
//                                                                                 })
//                                                                                 return poll.save();

//                                                                             } else {
//                                                                                 Selected option not found in the poll
//                                                                                 throw new Error('Selected option not found');
//                                                                             }
//                                                                         } else {
//                                                                             Poll not found
//                                                                             throw new Error('Poll not found');
//                                                                         }
//                                                                     })
//                                                                     .then((updatedPoll) => {
//                                                                         console.log('Poll updated:');
//                                                                     })
//                                                                     .catch((err) => {
//                                                                         console.error('Error:', err);
//                                                                     });


//                                                             } else {
//                                                                 Student not found
//                                                                 console.log('Student not found');
//                                                             }
//                                                         })
//                                                         .catch((error) => {
//                                                              Handle error
//                                                             console.error(error);
//                                                         });

//                                                 }
//                                             })
//                                             .catch((error) => {
//                                                 Handle error
//                                                 console.error(error);
//                                             });

//                                     }
//                                 })
//                                 .catch((err) => {
//                                     console.error('Error:', err);
//                                 });
//                         }
//                     }
//                 })
//                 .catch((err) => {
//                     Handle error
//                 });
//         }
//         res.send(200).status("okay")
//     }

// })
router.post('/pollset', async (req, res) => {
    const email = req.body.email
    const pollid = req.body.pollid
    const optionid = req.body.id
    console.log(email, pollid, optionid)
    if (email) {
        const student1 = await Student.findOne({ email }).lean()
        if (student1) {
            console.log("Student is available")
            const optionObjectId = new mongoose.Types.ObjectId(optionid);
            const pollObjectId = new mongoose.Types.ObjectId(pollid);

            Poll.findOne({ 'options._id': optionObjectId })
                .then((poll) => {
                    if (poll) {
                        const option = poll.options.find((o) => o._id.equals(optionObjectId));
                        const answer = option.option
                        const pollid = pollObjectId
                        const which = optionObjectId
                        console.log(answer, pollid, which)
                        if (option) {
                            Student.findOne({
                                email,
                                'pollvoted.poll': pollObjectId,
                                'pollvoted.which': optionObjectId
                            }).exec()
                                .then((student) => {
                                    if (student) {
                                        console.log('Poll and option IDs match in the student document');

                                    } else {
                                        console.log('Poll and option IDs do not match in the student document');
                                        var newpollid=new mongoose.Types.ObjectId(pollid);
                                        Student.findOne({ email, 'pollvoted.poll': newpollid })
                                            .then((student) => {
                                                const whichValue = pollid
                                                if (student) {
                                                    //Student found and has the given pollid
                                                    console.log('Student has the given pollid already updating the poll answwer');
                                                        console.log("work")
                                                        console.log("work")
                                                        // Continue with your logic using the "whichValue"
                                                    
                                                    Student.updateMany(
                                                        { email,"pollvoted.poll": pollid },
                                                        { $unset: { "pollvoted.$[elem].which": "", "pollvoted.$[elem].answer": "" } },
                                                        { arrayFilters: [{ "elem.poll": pollid }], new: true }
                                                    )
                                                        .then((student) => {
                                                            if (student) {
                                                                // Student found and updated
                                                                console.log('Previous pollvoted entries deleted:');
                                                                Poll.findById(pollid)
                                                                    .then((poll) => {
                                                                        console.log("old value has been decremented");
                                                                        if (poll) {
                                                                            const selectedOptionIndex = poll.options.findIndex((option) => option._id.equals(new mongoose.Types.ObjectId(pollid)));
                                                                            if (selectedOptionIndex !== -1) {
                                                                                console.log(selectedOptionIndex);
                                                                                // Decrement the selected value by 1
                                                                                poll.options[selectedOptionIndex].selected -= 1;
                                                                                // Save the updated poll and return the promise
                                                                                return poll.save();
                                                                            }
                                                                        }
                                                                    })
                                                                    .then((updatedPoll) => {
                                                                        if (updatedPoll) {
                                                                            console.log("Poll updated:", updatedPoll);
                                                                        } else {
                                                                            console.log("Selected option not found in the poll.");
                                                                        }
                                                                    })
                                                                    .catch((error) => {
                                                                        console.error("Error:", error);
                                                                    });                       // Poll.findById(whichValue)

                                                                Student.updateMany(
                                                                 
                                                                    { email,"pollvoted.poll": pollid },
                                                                    { $set: { "pollvoted.$[elem].which": which, "pollvoted.$[elem].answer": answer } },
                                                                    { arrayFilters: [{ "elem.poll": pollid }], new: true }
                                                                )
                                                                    .then((ult) => {

                                                                        console.log('Student has been assigned new poll data');


                                                                        Poll.findById(pollid)
                                                                            .then((poll) => {
                                                                                if (poll) {
                                                                                    const selectedOptionIndex = poll.options.findIndex((option) => option._id.equals(new mongoose.Types.ObjectId(optionObjectId)));

                                                                                    if (selectedOptionIndex !== -1) {

                                                                                        console.log(selectedOptionIndex)
                                                                                        //Update selected and other options
                                                                                        poll.options = poll.options.map((option, index) => {
                                                                                            if (isNaN(option.selected)) {
                                                                                                option.selected = 0
                                                                                            }
                                                                                            if (index === selectedOptionIndex) {
                                                                                                return { ...option, selected: option.selected + 1 };

                                                                                            } else {
                                                                                                if (option.selected === 0) {
                                                                                                    return { ...option, selected: 0 };

                                                                                                }
                                                                                                else {
                                                                                                    return { ...option, selected: option.selected - 1 };

                                                                                                }

                                                                                            }
                                                                                        })
                                                                                        return poll.save();
                                                                                    } else {
                                                                                        // Selected option not found in the poll
                                                                                        throw new Error('Selected option not found');
                                                                                    }
                                                                                } else {
                                                                                    // Poll not found
                                                                                    throw new Error('Poll not found');
                                                                                }

                                                                            })
                                                                            .then((updatedPoll) => {
                                                                                console.log('Poll updated:');
                                                                            })
                                                                            .catch((err) => {
                                                                                console.error('Error:', err);
                                                                            });

                                                                    })
                                                                    .catch((error) => {
                                                                        console.error('Error deleting previous pollvoted entries:', error);
                                                                    });
                                                            } else {
                                                                //  Student not found
                                                                console.log('Student not found');
                                                            }
                                                        })
                                                        .catch((error) => {
                                                            //Handle error
                                                            console.error(error);
                                                        });

                                                } else {
                                                    //Student not found or does not have the given pollid
                                                    console.log('Student not found or does not have the given pollid');

                                                    Student.findOneAndUpdate(
                                                        { email },
                                                        {
                                                            $addToSet: {
                                                                pollvoted: { poll: pollid, which: which, answer: answer }
                                                            }
                                                        },
                                                        { new: true }
                                                    )
                                                        .then((student) => {
                                                            if (student) {
                                                                //Student found and updated
                                                                console.log('Student:');

                                                                Poll.findById(pollid)
                                                                    .then((poll) => {
                                                                        if (poll) {
                                                                            var xwhichValue = new mongoose.Types.ObjectId(which);
                                                                            const selectedOptionIndex = poll.options.findIndex((option) => option._id.equals(new mongoose.Types.ObjectId(xwhichValue)));

                                                                            if (selectedOptionIndex !== -1) {
                                                                                console.log("the selected option ",selectedOptionIndex)
                                                                                //Update selected and other options
                                                                                poll.options = poll.options.map((option, index) => {
                                                                                    if (isNaN(option.selected)) {
                                                                                        option.selected = 0
                                                                                    }
                                                                                    if (index === selectedOptionIndex) {
                                                                                        return { ...option, selected: option.selected + 1 };

                                                                                    } else {
                                                                                        if (option.selected === 0) {
                                                                                            return { ...option, selected: 0 };
                                                                                        }else{
                                                                                            return { ...option, selected: option.selected }
                                                                                        }
                                                
                                                                                    }
                                                                                })
                                                                                return poll.save();

                                                                            } else {
                                                                                // Selected option not found in the poll
                                                                                throw new Error('Selected option not found');
                                                                            }
                                                                        } else {
                                                                            // Poll not found
                                                                            throw new Error('Poll not found');
                                                                        }
                                                                    })
                                                                    .then((updatedPoll) => {
                                                                        console.log('Poll updated:');
                                                                    })
                                                                    .catch((err) => {
                                                                        console.error('Error:', err);
                                                                    });


                                                            } else {
                                                                // Student not found
                                                                console.log('Student not found');
                                                            }
                                                        })
                                                        .catch((error) => {
                                                            //  Handle error
                                                            console.error(error);
                                                        });

                                                }
                                            })
                                            .catch((error) => {
                                                // Handle error
                                                console.error(error);
                                            });

                                    }
                                })
                                .catch((err) => {
                                    console.error('Error:', err);
                                });
                        }
                    }
                })
                .catch((err) => {
                    // Handle error
                });
        }
        res.send(200).status("okay")
    }

})


router.post('/getparti', async (req, res) => {
    const email = req.body.email
    Student.findOne({ email })
        .select('pollvoted.poll pollvoted.which')
        .then((student) => {
            if (student) {
                const pollvoted = student.pollvoted;
                const result = pollvoted.map(({ poll, which }) => ({ poll, which }));
                console.log('Poll and Which:', result);
                res.status(200).send(result)
            } else {
                console.log('Student not found');
            }
        })
        .catch((err) => {
            console.error('Error:', err);
        });

})

module.exports = router;
