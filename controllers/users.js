const express = require('express')
const router = express.Router()

const User = require('../models/users')
const bcrypt = require('bcrypt')


// User routerrouter.get('/new', (req, res)=>{
    res.render('users/new.ejs',{ currentUser: req.session.currentUser})
})


// USER CREATE ROUTE
router.post('/', (req, res)=>{
    // hashing and salting the password
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(9))

    User.create(req.body, (err, createdUser)=>{
        if  (err){
            if (err.code===11000){
                res.send('USER already exist!!!')
            }
            else{
                res.send(err)
            }
        }
        else{
            res.send(createdUser)
        }
    })
})
