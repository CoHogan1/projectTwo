const express = require('express')
const router = express.Router()

const Attempt = require('../models/schema.js')



// controllers ---------------------------------------------------------------
router.get('/', (req, res)=>{
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


router.post('/index', (req, res)=>{
    if (req.body.didItWork === "on"){
        req.body.didItWork = true;
    }
    else{
        req.body.didItWork = false;
    }
    Attempt.create(req.body, (err, newSystem)=>{
        if (err) {
            console.log(err)
        } else {
            console.log(newSystem)
            res.redirect('/home/index')
        }
    })
})

router.get('/index/new', (req, res)=>{
    console.log('**new route**')
    res.render('new.ejs')
})

router.get('/index/:id', (req, res)=>{
    Attempt.findById(req.params.id, (err, system)=>{
        //console.log(system)
        //res.send("This is working")
        res.render('show.ejs', { practices: system})
    })
})

router.get('/index', (req, res)=>{
    //console.log('get index route')
    Attempt.find({}, (err, data, next)=>{
        if (err) {
            console.log(err)
        } else {
            //console.log(data)
            res.render('index.ejs', { practices: data})
        }
    })
})

router.put('/index', (req, res)=>{
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

// delete-----------------------------------------------------------------------

router.delete('/index/:id', (req, res)=>{
    console.log('Delete route activated.')
    //res.send('Deleting')
    Attempt.findByIdAndRemove(req.params.id, (err, data)=>{
        if (err) {
            console.log(err)
        } else {
            console.log(data + " the data to be deleted.......")
            res.redirect('/home/index')
        }
    })
})

// edit route----1 0f 2---------------------------------------------------------
router.get('/index/:id/edit', (req, res)=>{
    Attempt.findById(req.params.id, (err, program)=>{
        //console.log(program)
        //res.send("This is working")
        res.render('edit.ejs', { practices: program })
    })
})

// --------------2 of 2---------------------------------------------------------
router.put('/index/:id', (req, res)=>{
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
module.exports = router
