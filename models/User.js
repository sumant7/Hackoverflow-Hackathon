const mongoose  = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
    name: {
        type: String, required: true
    },
    isEndangered:{
        type: Boolean, default: false
    },
    entrydate: {
        type: Date, default: Date.now()
    }
})

let item= mongoose.model('user', Schema)
module.exports = item