const mongoose = require('mongoose')
/**
 * Schema for a stream inside the database
 */
const streamSchema = mongoose.Schema({
    /** URL of the stream */
    url: String,
    /** List of the names given to that stream */
    name: [String],
    /** The available properties for the stream */
    properties: [{text: String, value: [String]}],
    /** All the fragmentations available for this stream */
    fragmentations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Fragmentation' }]
})

module.exports = mongoose.model('Stream', streamSchema)