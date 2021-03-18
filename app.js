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

app.use(express.urlencoded({extended:true}))

//==============================================================================
//--------------------------send files to database

// Attempt.create(information, (err, totalData)=>{
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(totalData)
//     }
//     db.close()
// })

//--------------------------clear database, and check database contents.

// Attempt.remove({}, (err, allData)=>{ // remove all data from DB
//     console.log(allData)
// })
//
// Attempt.find({}, (err, everything)=>{
//     console.log(everything)
//     db.close()
// })

//==============================================================================


// controllers ---------------------------------------------------------------
app.get('/home', (req, res)=>{
    console.log('Running')
    // Attempt.create(req.body, (err, genesis)=>{
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log(genesis)
    //         res.redirect('/home/')
    //     }
    //})
    res.send(`<h1>This is working!</h1>`)
})

//-----show---------------------------------------------------------------------
app.get('/home/index', (req, res)=>{
    console.log('index route')
    Attempt.find({}, (err, data, next)=>{
        if (err) {
            console.log(err)
        } else {
            //console.log(data)
            res.render('index.ejs', { practices: data})
        }
    })
})

app.put('/home/index', (req, res)=>{
    console.log('pposting to home/index route')
    Attempt.create(req.body, (err, genesis)=>{ // probably dont need this create.
        if (err) {
            console.log(err)
        } else {
            console.log(genesis + " this is the req.body")
            res.redirect('/home/index')
        }
    })
})

//-----show---------------------------------------------------------------------


app.get('/home/index/:id', (req, res)=>{
    Attempt.findById(req.params.id, (err, system)=>{
        //console.log(system)
        //res.send("This is working")
        res.render('show.ejs', { practices: system})
    })
})


// edit route----1 0f 2---------------------------------------------------------
app.get('/home/index/:id/edit', (req, res)=>{
    Attempt.findById(req.params.id, (err, program)=>{
        //console.log(program)
        //res.send("This is working")
        res.render('edit.ejs', { practices: program })
    })
})


// --------------2 of 2---------------------------------------------------------
app.put('/home/index/:id', (req, res)=>{
    //console.log(req.body) // this is working
    if (req.body.didItWork === 'on') {
        req.body.didItWork = true
    } else {
        req.body.didItWork = false
    }
    console.log(req.body)
    console.log(req.params.id)
    //res.send("Checking to see if this works")  // working
    Attempt.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true},
        (err, updates)=>{
            console.log(updates)
            //res.send(updates)
            res.redirect('/home/index')
    })
})


//------------------------------------------------------------------------------







app.listen(PORT, (req, res)=>{
    console.log('app is listening')
})
