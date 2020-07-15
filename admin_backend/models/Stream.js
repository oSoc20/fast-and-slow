const mongoose = require('mongoose')

const streamSchema = mongoose.Schema({
    url: String,
    name: [String],
    properties: [{text: String, value: [String]}],
    fragmentations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Fragmentation' }]
})

module.exports = mongoose.model('Stream', streamSchema)