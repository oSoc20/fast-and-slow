const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Something')
})

app.listen(3000, () => {
    console.log('App started in port 3000')
})