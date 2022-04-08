const { Timestamp } = require('mongodb')
const mongoose  = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
    username: {
        type: String, required: true, unique: true
    },
    password:{
        type: String, default: false
    },
    name:{
        type: String, required: true
    },
    freedate: {
        type: String, required: true
    },
    from1: {
        type: String, required: true, default: ""
    },
    till1: {
        type: String, required: true, default: ""
    },
    from2: {
        type: String, default: ""
    },
    till2: {
        type: String, default: ""
    },
    from3: {
        type: String, default: ""
    },
    till3: {
        type: String, default: ""
    }
})

let item= mongoose.model('user', userSchema)
module.exports = item