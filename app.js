// whatever I want to call my app

require('dotenv').config()
const express = require('express')
const PORT = process.env.PORT
const app = express()

const session = require('express-session');
const systemControllers = require('./controllers/server.js')
const Attempt = require('./models/schema.js')
const Client = require('./models/users.js')


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

const methodOverride = require('method-override')
app.use(methodOverride('_method'))



const mongoose = require('mongoose')
const information = require('./models/databseInfo.js') // lol databse.
const usersList =   require('./models/usersList.js') // users able to log in.
const mongoURI = process.env.MONGODBURI
const db = mongoose.connection

mongoose.connect(mongoURI , { // start connection to db
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
},()=>{
    console.log("Mongo connection is  established.")
})

// connection error handeling.
db.on('error', (err)=> console.log(err.message + ' Mongo is not running!!!'))
db.on('connected', ()=> console.log('Mongo connected: ' + mongoURI))
db.on('disconnected', ()=> console.log('Mongo is now Disconnected, Have a good day!'))


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

// Client.create(usersList, (err, allUsers)=>{
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(allUsers)
//     }
//     db.close()
// })

//--------------------------clear database, and check database contents---------

// Attempt.remove({}, (err, allData)=>{ // remove all data from DB
//     console.log(allData)
// })

//-------------------------clear users database---------------------------------

// Attempt.find({}, (err, everything)=>{
//     console.log(everything)
//     db.close()
// })

//==============================================================================
app.use(session({
    secret: process.env.SECRET,
    resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
    saveUninitialized: false // default  more info: https://www.npmjs.com/package/express-session#resave
}))


// middleware to ensure user is logged in. // need to have users before hand...

const isAuthenticated = (req, res, next) => { // comment out to set up a new user.
    console.log('log-in dummy..... :)')
    //console.log(req.session.currentUser + " this is the current user");
    if (req.session.currentUser) {
        console.log(req.session.currentUser)
        return next()
    } else {
        console.log(req.sessions.currentUser)
        res.redirect('/sessions/new')
    }
}

const homeControllers = require('./controllers/server')
app.use('/home', isAuthenticated,  homeControllers) // use once user is set up
//app.use('/home', homeControllers) // make new user

const usersControllers = require('./controllers/users')
app.use('/users', isAuthenticated,  usersControllers) // use once user is set up
//app.use('/users', usersControllers) // make new user

const sessionsControllers = require('./controllers/sessions')
app.use('/sessions', sessionsControllers)


// HOMEPAGE Route
app.get('/home', (req, res) => {
    console.log('currentUser')
    res.render('home.ejs', {
        currentUser: req.session.currentUser
    })
})



app.listen(PORT, (req, res)=>{
    console.log('Project 2 App is listening.')
})

// // controllers ---------------------------------------------------------------
// app.get('/home', (req, res)=>{
//     console.log('Running')
//     // Attempt.create(req.body, (err, genesis)=>{
//     //     if (err) {
//     //         console.log(err)
//     //     } else {
//     //         console.log(genesis)
//     //         res.redirect('/home/')
//     //     }
//     //})
//     res.send(`<h1>This is working!</h1>`)
// })
//
// //-----show---------------------------------------------------------------------
//
//
// app.post('/home/index', (req, res)=>{
//     if (req.body.didItWork === "on"){
//         req.body.didItWork = true;
//     }
//     else{
//         req.body.didItWork = false;
//     }
//     Attempt.create(req.body, (err, newSystem)=>{
//         if (err) {
//             console.log(err)
//         } else {
//             console.log(newSystem)
//             res.redirect('/home/index')
//         }
//     })
//
// })
//
// app.get('/home/index/new', (req, res)=>{
//     console.log('**new route**')
//     res.render('new.ejs')
// })
//
//
//
// app.get('/home/index/:id', (req, res)=>{
//     Attempt.findById(req.params.id, (err, system)=>{
//         //console.log(system)
//         //res.send("This is working")
//         res.render('show.ejs', { practices: system})
//     })
// })
//
// app.get('/home/index', (req, res)=>{
//     //console.log('get index route')
//     Attempt.find({}, (err, data, next)=>{
//         if (err) {
//             console.log(err)
//         } else {
//             //console.log(data)
//             res.render('index.ejs', { practices: data})
//         }
//     })
// })
//
// app.put('/home/index', (req, res)=>{
//     console.log('pposting to home/index route')
//     Attempt.create(req.body, (err, genesis)=>{ // probably dont need this create.
//         if (err) {
//             console.log(err)
//         } else {
//             console.log(genesis + " this is the req.body")
//             res.redirect('/home/index')
//         }
//     })
// })
//
//
// // delete-----------------------------------------------------------------------
//
// app.delete('/home/index/:id', (req, res)=>{
//     console.log('Delete route activated.')
//     //res.send('Deleting')
//     Attempt.findByIdAndRemove(req.params.id, (err, data)=>{
//         if (err) {
//             console.log(err)
//         } else {
//             console.log(data + " the data to be deleted.......")
//             res.redirect('/home/index')
//         }
//     })
// })
//
// // edit route----1 0f 2---------------------------------------------------------
// app.get('/home/index/:id/edit', (req, res)=>{
//     Attempt.findById(req.params.id, (err, program)=>{
//         //console.log(program)
//         //res.send("This is working")
//         res.render('edit.ejs', { practices: program })
//     })
// })
//
//
// // --------------2 of 2---------------------------------------------------------
// app.put('/home/index/:id', (req, res)=>{
//     //console.log(req.body) // this is working
//     if (req.body.didItWork === 'on') {
//         req.body.didItWork = true
//     } else {
//         req.body.didItWork = false
//     }
//     console.log(req.body)
//     console.log(req.params.id)
//     //res.send("Checking to see if this works")  // working
//     Attempt.findByIdAndUpdate(
//         req.params.id,
//         req.body,
//         {new:true},
//         (err, updates)=>{
//             console.log(updates)
//             //res.send(updates)
//             res.redirect('/home/index')
//     })
// })
//
// //------------------------------------------------------------------------------
