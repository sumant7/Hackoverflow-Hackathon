const express = require('express')
const mongoose  = require('mongoose')
const app = express()

app.set("view engine","ejs");

app.use(express.static("public"))