const mongoose = require('mongoose')

const fragmentationSchema = mongoose.Schema({
    url: [String],
    strategy: String,
    property: String,
    enabled: {type: Boolean, default: true},
    stream: { type: mongoose.Schema.Types.ObjectId, ref: 'Stream' }
})

module.exports = mongoose.model('Fragmentation', fragmentationSchema)