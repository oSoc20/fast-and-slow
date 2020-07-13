const express = require('express');
const redis = require('redis');
const bodyParser = require('body-parser');

const app = express();
const client = redis.createClient();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

app.get('/', (req, res) => {
    res.send('Something')
})

app.get('/add', (req, res) => {
    client.set('testKey', 'testValue', redis.print);
    res.send('Added')
})

app.get('/get', (req, res) => {
    client.get('testKey', function (err, result) {
        if (err) {
            console.log(err);
            throw err;
        }
        res.json(result)
    })

})

client.set('testKey', 'testValue', redis.print);


app.listen(3000, () => {
    console.log('App started in port 3000')
})