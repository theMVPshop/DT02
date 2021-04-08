const express = require('express')
const router = express.Router()

const emailController = require('../controllers/mailer.js')



router.post('/mailer/send/', emailController.sendEmail)



module.exports = router

