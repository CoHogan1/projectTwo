const express = require('express')
const router = express.Router()

const Attempt = require('../models/schema.js')



// controllers -----------------------------------------------------------------
// router.get('/', (req, res)=>{
//     console.log('Running')
//     // Attempt.create(req.body, (err, genesis)=>{
//     //     if (err) {
//     //         console.log(err)
//     //     } else {
//     //         console.log(genesis)
//     //         res.redirect('/home/')
//     //     }
//     //})
//     res.redirect()
// })

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
    res.render('new.ejs', {currentUser: req.session.currentUser})
})

router.get('/index/:id', (req, res)=>{
    Attempt.findById(req.params.id, (err, system)=>{
        //console.log(system)
        //res.send("This is working")
        res.render('show.ejs', { practices: system})
    })
})

router.get('/index', (req, res)=>{
    Attempt.find({}, (err, data, next)=>{
        if (err) {
            console.log(err)
        } else {
            //console.log(data)
            res.render('index.ejs',
            { practices:data, currentUser:req.session.currentUser})
        }
    })
})

router.put('/index', (req, res)=>{
    console.log('pposting to home/index route')
    if (req.body.didItWork === 'on') {
        req.body.didItWork = true
    } else {
        req.body.didItWork = false
    }
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

router.get('/index/:id/show', (req, res)=>{
    console.log(req.params.id)
    Attempt.findById(req.params.id, (err, program)=>{
        if (err) {
            console.log(err + ' error')
            console.log(program + ' program')
        } else {
            //res.send(program)
            res.render('show.ejs', {
                practices: program,
                currentUser: req.session.currentUser
             })
        }
    })
})

// edit route----1 0f 2---------------------------------------------------------
router.get('/index/:id/edit', (req, res)=>{
    console.log(req.params.id)
    Attempt.findById(req.params.id, (err, program)=>{
        if (err) {
            console.log(err + ' error')
            console.log(program + ' program')
        } else {
            //res.send(program)
            res.render('edit.ejs', {
                practices: program,
                currentUser: req.session.currentUser
             })
        }
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



// moon flower for dark mode.
