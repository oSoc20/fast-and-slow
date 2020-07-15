const mongoose = require('mongoose')

const streamSchema = mongoose.Schema({
    url: String,
    name: [String]
})

module.exports = mongoose.model('Stream', streamSchema)