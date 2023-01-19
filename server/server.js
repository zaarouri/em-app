const app = require('./app')
const dotenv = require('dotenv')
dotenv.config({path:'./config/config.env'})
// MongoDb connection

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
mongoose.connect(process.env.database)
.then(console.log('MongoDb connected'))
.catch((err)=>{
    console.log('MongoDb Connection Failed')
})








// server
app.listen(process.env.PORT,()=>{
    console.log(`server is running on ${process.env.PORT}`)
})
