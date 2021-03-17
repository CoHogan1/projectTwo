const mongoose = require('mongoose')
const Schema = mongoose.Schema

const procedueSchema = new Schema ({
    name: String, // name of the symptom?
    didItWork: {type: Boolean, default: false},
    myRating: Nnumber,
    results: String,
    notes: String,
},{timestamps : true})

const Attempt = mongoose.model('attempt', procedueSchema)

module.exports = Attempt
