const mongoose = require('mongoose')

const fragmentationSchema = mongoose.Schema({
    url: [String],
    strategy: String,
    property: String,
    active: Boolean,
    stream: { type: mongoose.Schema.Types.ObjectId, ref: 'Stream' }
})

module.exports = mongoose.model('Fragmentation', fragmentationSchema)