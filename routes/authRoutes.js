const express = require("express")
const router = express.Router()
const { signup, login, logout } = require("../controllers/authController")


router.route('/sign-up').post(signup)
router.route('/login').post(login)
router.route('/logout').post(logout)

// router.get('/hello', hello)
module.exports = router