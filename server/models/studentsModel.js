const mongoose= require('mongoose')
const bcrypt = require('bcrypt')
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
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validator:isEmail,
        required: [true, "Email required"]
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
    },
    picture:{
        type:String,
        default:"./assets/profil/random-user.png"
    },
    bio:{
        type:String,
        max:2048
    },
    followers:{
        type:[String],
    },
    following:{
        type:[String]
    },
    likes:{
        type:[String]
    }
    },{timestamps:true}
    )
// hashing password before save it 
studentshema.pre("save",async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password,salt)
    next()
})
studentshema.statics.login = async function(email,password){
    const user = await this.findOne({email})
    if(user){
        const auth = await bcrypt.compare(password ,user.password)
     if (auth) {
        return user
     }
     throw Error('incorrect password')
    }
    throw Error('incorrect email')
}
module.exports = mongoose.model('student',studentshema)
