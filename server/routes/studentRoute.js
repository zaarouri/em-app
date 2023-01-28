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
router.delete('/:id',userController.deleteUser)
router.patch('/follow/:id',userController.follow)
// router.patch('/follow/:id',userController.unfollow)

module.exports = router