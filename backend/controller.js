const express = require("express")
const app = express()
const cors = require('cors')
const { mongourl } = require('./keys')
const mongoose = require('mongoose')
const multer = require("multer")
const bodyparser = require("body-parser")
const session = require('express-session')
const port = 6969;



const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "gendarehnluqmanputar",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));




// app.use(cors({ credentials: true, origin: 'http://localhost:19006' }))
app.use(cors({ credentials: true, origin: 'http://192.168.18.21:19006' }))


mongoose.connect(mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', (err) => {
    if (err) throw err
    console.log("Connected to MongoDb")
})




//for signup
require('./models/student')
const authroutes = require('./routes/authenticate')
app.use(bodyparser.json())
app.use(express.urlencoded({ extended: false }));
app.use(authroutes);



require('./models/posts')
const postroutes = require('./routes/postapi')
app.use(bodyparser.json())
app.use(express.urlencoded({ extended: false }));
app.use(postroutes);



require('./models/student')
const studentroutes = require('./routes/studentcalender')
app.use(bodyparser.json())
app.use(express.urlencoded({ extended: false }));
app.use(studentroutes);


require('./models/poll')
const pollroutes = require('./routes/pollroute')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }));
app.use(pollroutes);


require('./models/resource')
const resroutes = require('./routes/resourceroutes')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }));
app.use(resroutes);


require('./models/headlines')
const headroutes = require('./routes/headroute')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }));
app.use(headroutes);



require('./models/revcal')
const headx = require('./routes/revcalroute')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }));
app.use(headx);




app.listen(port, () => {
    console.log("Backend server is hosted on Port: " + port)
})