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
    /**
     * Get all the streams with their latest name
     * @type {{}}
     */
    let streams = {}
    client.keys('*').then(async (keys) => {
        // for await (let i = 0; i < keys.length; i++) {
        let promises = []
        for (let key of keys) {
            // const key = keys[i]
            let promise = client.get(key).then((result) => {
                let name_list = JSON.parse(result)
                streams[key] = name_list[name_list.length - 1]
            }).catch((err) => {
                console.error(err)
            })
            promises.push(promise)
        }
        await Promise.all(promises)

        res.json(streams)
    }).catch((err) => {
        console.error(err)
    })
})



app.post('/streams', async function (req, res) {
    /**
     * Add a new stream
     */
    console.log(req.body)
    var url = req.body.url;
    var name = req.body.name;
    client.get(url).then(function (result) {
        var name_list = []
        if (result) {
            name_list = JSON.parse(result)
            name_list.push(name)
        } else {
            name_list = [name]
        }
        client.set(url, JSON.stringify(name_list))
    }).catch((err) => console.error(err))
    res.json({status: 'success'})
})


app.listen(3000, () => {
    console.log('App started in port 3000')
})