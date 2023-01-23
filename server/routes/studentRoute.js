express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')
// authentfication
router.post('/register',authController.signUp)
// 
router.get('/',userController.getAllUsers)
router.get('/:id',userController.getUser)
router.put('/:id',userController.updateUser)

module.exports = router