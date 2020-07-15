const mongoose = require('mongoose')

const streamSchema = mongoose.Schema({
    url: String,
    name: [String],
    properties: [{text: String, value: [String]}]
})

module.exports = mongoose.model('Stream', streamSchema)