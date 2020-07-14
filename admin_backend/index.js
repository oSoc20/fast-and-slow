const express = require('express');
const redis = require('async-redis');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const client = redis.createClient();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

app.get('/', (req, res) => {
    res.send('Something')
})

app.get('/streams', (req, res) => {
    let streams = {}
    client.keys('*').then(async (keys) => {
        // for await (let i = 0; i < keys.length; i++) {
        let promises = []
        for (let key of keys) {
            // const key = keys[i]
            console.log(key)
            let promise = client.get(key).then((result) => {
                let name_list = JSON.parse(result)
                streams[key] = name_list[name_list.length - 1]
            }).catch((err) => {
                console.error(err)
            })
            promises.push(promise)
        }
        await Promise.all(promises)
        console.log(streams)
        res.json(streams)
    }).catch((err) => {
        console.error(err)
    })
})


// app.get('/streams', (req, res) => {
//     let streams = {}
//     client.keys('*', (err, keys) => {
//         if (err) return console.log(err)
//         if (keys) {
//             async.map(keys, (key, cb) => {
//                 client.get(key, (error, value) => {
//                     if (error) return cb(error)
//                     let name_list = JSON.parse(value)
//                     streams[key] = name_list[name_list.length - 1]
//                 })
//             })
//         }
//     })
//     console.log(streams)
//     res.json(streams)
// })


app.post('/stream', function (req, res) {
    console.log(req.body)
    var url = req.body.url;
    var name = req.body.name;
    client.get(url, function (err, result) {
        if (err) {
            console.log(err);
            throw err;
        }
        var name_list = []
        if (result) {
            name_list = JSON.parse(result)
            name_list.push(name)
        } else {
            name_list = [name]
        }
        client.set(url, JSON.stringify(name_list), redis.print)
    })
    res.json({status: 'success'})
})


app.listen(3000, () => {
    console.log('App started in port 3000')
})