const studentsModel = require('../models/studentsModel')
const jwt = require('jsonwebtoken')
require('../models/studentsModel')
const maxAge = 3 * 24 * 60 * 60 * 1000
const createToken = (id)=>{
    return jwt.sign({id},process.env.token_secret,{
        expiresIn: maxAge
    })
}


module.exports.signUp = async (req,res)=>{
const {firstName ,lastName,email,password,field} = req.body
try{
    const student = await studentsModel.create({firstName ,lastName,email,password,field})
    res.status(201).json({student})
}
catch(err){
    res.status(200).send({err})
}
}
module.exports.signIn = async (req,res)=>{
    const {email,password} = req.body
    try {
        const user = await studentsModel.login(email,password)
        const token = createToken(user._id)
        res.cookie('jwt',token,{httpOnly:true,maxAge})
        res.status(200).json({user: user._id})
    } catch (error) {
        res.status(200).json(error)
    }
}
module.exports.logout = async (req,res)=>{
    res.cookie('jwt',"",{maxAge:1})
    res.redirect('/')
}