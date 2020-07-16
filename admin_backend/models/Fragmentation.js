const mongoose = require('mongoose')
/**
 * Schema for a fragmentation inside the database
 */
const fragmentationSchema = mongoose.Schema({
    /** URL of the fragmentation */
    url: [String],
    /** The strategy used in the fragmentation */
    strategy: String,
    /** The property on which the fragmentation is done */
    property: String,
    /** Indicate if the fragmentation is enabled */
    enabled: {type: Boolean, default: true},
    /** All the streams for which this fragmentation is available */
    stream: { type: mongoose.Schema.Types.ObjectId, ref: 'Stream' }
})

module.exports = mongoose.model('Fragmentation', fragmentationSchema)