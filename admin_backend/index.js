const express = require('express');
const redis = require('redis');
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

app.post('/addStream', function (req, res) {
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
            console.log(name_list)
            name_list.push(name)
            console.log(name_list)

        } else {
            name_list = [name]
        }
        client.set(url, JSON.stringify(name_list), redis.print)
    })
    console.log('added')
    res.send('success')
})


app.listen(3000, () => {
    console.log('App started in port 3000')
})