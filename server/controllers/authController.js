const studentsModel = require('../models/studentsModel')

require('../models/studentsModel')



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