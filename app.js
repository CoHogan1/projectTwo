// whatever I want to call my app
const express = require('express')
const PORT = 3000
const app = express()

app.use(express.json())
//app.use(express.url({extended: true}))
app.use(express.static('public'))

const mongoose = require('mongoose')


const Attempt = require('./models/schema.js')






// controllers ---------------------------------------------------------------
app.get('/home', (req, res)=>{
    console.log('Running')
    res.send(`<h1>This is working!</h1>`)
})



app.listen(PORT, (req, res)=>{
    console.log('app is listening')
})
