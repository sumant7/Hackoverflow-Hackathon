const { Timestamp } = require('mongodb')
const mongoose  = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
    username: {
        type: String, unique: true
    },
    password:{
        type: String
    },
    name:{
        type: String, default:""
    },
    from1: {
        type: String,  default: ""
    },
    till1: {
        type: String,  default: ""
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