const express = require('express')
const app = express()
const studentRoute = require('./routes/studentRoute')

//routes
app.use(express.json())
app.use('/api/student',studentRoute)




app.get('/',(req ,res)=>{
    res.status(200).json({
        "success":true,
        "message":"affichage de toutes les produits"
    })
})


module.exports = app