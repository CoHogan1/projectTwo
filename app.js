// whatever I want to call my app
const express = require('express')
const PORT = 3000
const app = express()

app.use(express.json())
//app.use(express.url({extended: true}))
app.use(express.static('public'))

const mongoose = require('mongoose')

const methodOverride = require('method-override')
app.use(methodOverride('_method'))


const Attempt = require('./models/schema.js')
const information = require('./models/databseInfo.js') // lol databse.
const mongoURI = 'mongodb://127.0.0.1:27017/' + 'deFogger' // database name
const db = mongoose.connection

mongoose.connect(mongoURI , { // start connection to db
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
},()=>{
    console.log("Mongo connectoin established.")
})

// connection error handeling.
db.on('error', (err)=> console.log(err.message + ' Mongo is not running!!!'))
db.on('connected', ()=> console.log('Mongo connected: ' + mongoURI))
db.on('disconnected', ()=> console.log('Mongo is now Disconnected, Have a good day!'))

// send files to database

Attempt.create(information, (err, totalData)=>{
    if (err) {
        console.log(err)
    } else {
        console.log(totalData)
    }
    db.close()
})

// Attempt.remove({}, (err, allData)=>{ // remove all data from DB
//     console.log(allData)
// })

// Attempt.find({}, (err, everything)=>{
//     console.log(everything)
//     db.close()
// })





// controllers ---------------------------------------------------------------
app.get('/home', (req, res)=>{
    console.log('Running')
    res.send(`<h1>This is working!</h1>`)
})

app.get('/home/index', (req, res)=>{
    console.log('index route')
    res.send()
})



app.listen(PORT, (req, res)=>{
    console.log('app is listening')
})
