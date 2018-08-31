const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 3300;

const app = express();
app.use(bodyParser.json());

app.use(cors());

app.get('/',function(req, res){
    res.send('Hello from data recieveing server');
})

app.listen(PORT, function(){
    console.log("Serverot raboti na localhost:" + PORT);
})

app.post('/sendData', function(req, res){
    console.log(req.body);
    res.status(200).send({"message":"Data From User Recieved", "body": req.body})
})