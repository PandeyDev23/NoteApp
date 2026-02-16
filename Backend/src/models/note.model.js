const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
    title: String,
    Content : String,
})

const noteModel= mongoose.model('Note', noteSchema)

module.exports = noteModel;