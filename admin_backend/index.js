const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')
const Stream = require('./models/Stream')
const Fragmentation = require('./models/Fragmentation')
const loadProperties = require('./fetchProperties')
const dotenv = require('dotenv')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())
dotenv.config()

//
const db_url = 'mongodb://localhost/testDB'
mongoose.connect(db_url)

const DOMAIN = process.env.DOMAIN

/**
 * Get all the properties of a stream
 */
app.get('/domain', (req, res) => {
    res.json(DOMAIN)
})

/**
 * Get all the streams with their latest name
 */
app.get('/streams', (req, res) => {
    Stream.find({})
        .exec()
        .then(result => {
            let streams = []
            result.forEach(stream => {
                const name = stream.name[stream.name.length - 1]
                streams.push({name: name, url: stream.url})
            })
            console.log(streams)
            res.json(streams)
        })
        .catch(err => {
            console.error(err)
            res.json({status: 'failure', msg: "Unable to get all data stream"})
        })
})

/**
 * Add a new stream
 */
app.post('/streams', async function (req, res) {
    console.log('body:', req.body)
    let url = req.body.url;
    let name = req.body.name;

    Stream.findOne({url: url}, {name: name})
        .then(result => {
            if (result !== null) {
                result.name.push(name);
                result.save().then((result) => {
                    res.json({status: 'success'})
                })
                    .catch(err => {
                        console.error(err)
                        res.json({status: 'failure', msg: "Unable to store the updated data stream"})
                    })
            } else {
                loadProperties(url)
                    .then(props => {
                        const stream = new Stream({
                            url: url,
                            name: [name],
                            properties: props
                        })
                        stream.save()
                            .then((result) => {
                                res.json({status: 'success'})
                            })
                            .catch(err => {
                                console.error(err)
                                res.json({status: 'failure', msg: "Unable to store the data stream"})
                            })
                    })
                    .catch(
                        err => {
                            console.error(err)
                            res.json({status: 'failure', msg: "Unable to connect to data stream"})
                        })
            }
        })
        .catch(err => {
            res.json({status: 'failure', msg: "The requested data stream is not present"})
        })
})

/**
 * Get all the properties of a stream
 */
app.get('/streams/properties', (req, res) => {
    // The stream URL
    const url = req.query.url
    Stream.findOne({url: url})
        .then(result => {
            res.json(result.properties)
        })
        .catch(err => {
            console.error(err)
            res.json({status: 'failure', msg: "The requested data stream is not present"})
        })
})

/**
 * Get all the fragmentations available for a stream
 */
app.get('/streams/fragmentation', (req, res) => {
    // The stream URL
    const url = req.query.url;
    Stream.findOne({url: url})
        .populate('fragmentations')
        .then(result => {
            res.json({status: 'success', fragmentations: result.fragmentations})
        })
        .catch(err => {
            console.error(err)
            res.json({status: 'failure', msg: "url not present"})
        })
})

/**
 * Get a specific fragmentations base on a url
 */
app.get('/fragmentation/:endpoint', (req, res) => {
    let url = DOMAIN + 'fragmentation/' + req.params.endpoint;
    Fragmentation.findOne({url: url})
        .populate('stream')
        .then(result => {
            if (result.enabled) {
                console.log(result)
                console.log(result.stream.name)
                res.json({status: 'success', content: result})
            } else {
                res.json({status: 'failure', msg: "The fragmentation is disabled"})
            }
        })
        .catch(err => {
            console.error(err)
            res.json({status: 'failure', msg: "url not present"})
        })
})

/**
 * Add a new fragmentation
 */
app.post('/fragmentation', (req, res) => {
    let url = req.body.url;
    let stream_url = req.body.stream;
    let strategy = req.body.strategy;
    let property = req.body.property;
    console.log(req.body)
    Stream.findOne({url: stream_url})
        .then(stream_result => {
            if (stream_result === null) {
                res.json({status: 'failure', msg: 'The requested data stream is not present'})
            } else {
                const new_url = DOMAIN + 'fragmentation/' + url

                Fragmentation.findOne({url: new_url})
                    .then(check_result => {
                        if (check_result) {
                            res.json({
                                status: 'warning',
                                msg: 'The fragmentation url is already in use'
                            })
                        } else {
                            Fragmentation.findOne({strategy: strategy, property: property, stream: stream_result._id})
                                .then(result => {
                                    if (result !== null) {
                                        console.log('present')
                                        result.url.push(new_url)
                                        result.save()
                                            .then(
                                                res.json({status: 'success', url: new_url})
                                            )
                                            .catch(err => {
                                                    console.error(err)
                                                    res.json({
                                                        status: 'failure',
                                                        msg: "An error occurred when storing the updated fragmentation"
                                                    })
                                                }
                                            )
                                    } else {
                                        const fragmentation = new Fragmentation({
                                            url: new_url,
                                            strategy: strategy,
                                            property: property,
                                            stream: stream_result._id
                                        })
                                        fragmentation.save()
                                            .then(frag_result => {
                                                stream_result.fragmentations.push(frag_result._id)
                                                stream_result.save()
                                                    .then(
                                                        res.json({status: 'success', url: new_url})
                                                    )
                                                    .catch(err => {
                                                        console.error(err)
                                                        res.json({
                                                            status: 'failure',
                                                            msg: "An error occurred when saving the fragmentation"
                                                        })
                                                    })
                                            })
                                            .catch(err => {
                                                console.error(err)
                                                res.json({
                                                    status: 'failure',
                                                    msg: "An error occurred when saving the fragmentation"
                                                })
                                            })
                                    }
                                })
                        }
                    })
            }
        })
})

/**
 * Enable or disable a fragmentation
 */
app.post('/fragmentation/enable', (req, res) => {
    const enabled = req.body.enabled
    const url = req.body.url

    Fragmentation.findOne({url: url})
        .then(result => {
            result.enabled = enabled
            result.save()
            res.json({status: 'success'})
        })
        .catch(err => {
            console.error(err)
            res.json({status: 'failure', msg: "The requested fragmentation is not present"})
        })
})

app.listen(3000, () => {
    console.log('App started in port 3000')
})