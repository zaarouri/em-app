const mongoose= require('mongoose')
const { default: isEmail } = require('validator/lib/isEmail')
const studentshema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLenght:3,
        maxLenght:70,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        minLenght:3,
        maxLenght:80,
        trim:true
    },
    email:{
        type:String,
        required:true,
        validator:[isEmail],
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        max:1024,
        minLenght:8
    },
    field:{
        type:String,
        required:true,
    }
    
})
module.exports = mongoose.model('student',studentshema)
