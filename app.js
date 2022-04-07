const express = require('express');
const mongoose  = require('mongoose');
const bodyParser = require('body-parser');
const register = require('./routes/register')
const app = express();
const port = process.env.port || 3000 //process.env.port for hosting

app.set("view engine","ejs");

app.use(express.static("public"));

app.use('/', register)

app.listen(port, ()=>{
    console.log("Listening")
})