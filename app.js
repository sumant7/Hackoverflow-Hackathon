const express = require('express');
const mongoose  = require('mongoose');
const bodyParser = require('body-parser');
const register = require('./routes/register');
const app = express();

//db
const db = "mongodb://hackoverflow:test1234@cluster0-shard-00-00.vzfz9.mongodb.net:27017,cluster0-shard-00-01.vzfz9.mongodb.net:27017,cluster0-shard-00-02.vzfz9.mongodb.net:27017/Hackoverflow?ssl=true&replicaSet=atlas-p5fh4f-shard-0&authSource=admin&retryWrites=true&w=majority"
mongoose.connect(db, 
    { 
      useNewUrlParser: true, 
      useUnifiedTopology: true //since node version chosen 2.12 or later
    })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
   




const port = process.env.port || 3000; //process.env.port for hosting

app.set("view engine","ejs");

app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/', register);

app.listen(port, ()=>{
    console.log("Listening");
})