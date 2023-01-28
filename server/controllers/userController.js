const { json } = require('express');
const { default: mongoose } = require('mongoose')
const usermodel = require('../models/studentsModel')
const objectID = require('mongoose').Types.ObjectId



//affichage de toutes les utilisateurs
module.exports.getAllUsers = async (req, res) => {
    const users = await usermodel.find().select('-password');
    res.status(200).json({ users })
}
// affichage  utilisateur par id 
module.exports.getUser = async (req, res) => {
    if (!objectID.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + req.params.id)

    usermodel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs)
        else console.log('ID unknown :' + err)
    }).select('-password')
}
// recherche par id et modifier
module.exports.updateUser = async (req, res) => {
    if (!objectID.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + req.params.id)

    usermodel.findOneAndUpdate({ _id: req.params.id },
        {
            bio: req.body.bio,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            passwrod: req.body.password,
            email: req.body.email

        }, { new: true }
        , (err, docs) => {
            if (err) {
                res.status(500).json({ message: err })
            } else {
                res.status(200).json("user info updated" + docs)
            }
        })
}
// supression 
module.exports.deleteUser = async (req, res) => {
    if (!objectID.isValid(req.params.id))
        return res.status(400).send('ID unknown :' + req.params.id)
    try {
        await usermodel.deleteOne({ _id: req.params.id }).exec()
        res.status(200).json("user deleted successfuly !")
    } catch (err) {
        res.status(500).json({ message: err })
    }
}


module.exports.follow = async function (req, res) {
    if (!objectID.isValid(req.params.id)|| !objectID.isValid(req.body.tofollow))
        return res.status(400).send('ID unknown :' + req.params.id)
    try {
        //  await usermodel.findByIdAndUpdate(
        //     req.params.id,
        //     { $push: { following: req.body.tofollow } },
        //     { new: true, upsert: true, },
        //     (err, data) => {
        //         if (!err) {
        //             res.status(201).json("followed successfuly " + data)
        //         } else {
        //             res.status(400).json("error")
        //         }
        //     }
        // ),
        await usermodel.findByIdAndUpdate(
            req.body.tofollow,
            { $addToSet: { followers: req.params.id } },
            { new: true, upsert: true, },
            (err, data) => {
                if (!err) {
                    res.status(201).json(" get followed successfuly " + data)
                } else {
                    res.status(400).json("error")
                }
            }
        )

    } catch (err) {
        // res.status(500).json({message:err})
    }
}


