const { json } = require('express');
const { default: mongoose } = require('mongoose')
const usermodel = require('../models/studentsModel')
const objectID = require('mongoose').Types.ObjectId




module.exports.getAllUsers = async (req,res)=>{
const users = await usermodel.find().select('-password');
res.status(200).json({users})
}
module.exports.getUser = async (req,res)=>{
    if(!objectID.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + req.params.id)

    usermodel.findById(req.params.id ,(err,docs)=>{
        if(!err) res.send(docs)
        else console.log('ID unknown :' +err)
    }).select('-password')
}
module.exports.updateUser = async (req,res)=> {
   usermodel.findOneAndUpdate({_id:req.params.id},
    {bio:req.body.bio} , (err)=>{
        if(err){
        res.status(500).json({ message : err })
        }else{
        res.status(200).json("user info updated")
        }
    })
}