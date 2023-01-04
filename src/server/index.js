const dotenv = require('dotenv');
dotenv.config();
var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
const fetch = require('node-fetch');
const app = express();
//console.log(`Your API key is ${process.env.API_KEY}`);
/* Middleware*/
const bodyParser= require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Cors for cross origin allowance
const cors=require('cors');
app.use(cors());
app.use(express.static('dist'))
console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081')
})