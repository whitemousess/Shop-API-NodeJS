const express = require('express')
const router = express.Router();

const authController = require('../controllers/authController')
const checkLogin = require('../middleware/login')

// get all account
router.get('/getall', authController.getAll)

router.put('/current/edit',checkLogin, authController.currentEdit)
router.get('/current',checkLogin, authController.currentUser)

router.post('/login', authController.login)
router.post('/register', authController.register)

module.exports = router;