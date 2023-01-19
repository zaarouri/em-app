express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

//routes
router.post('/register',authController.signUp)

module.exports = router