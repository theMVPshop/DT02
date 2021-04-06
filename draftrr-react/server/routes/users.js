const express = require('express')
const router = express.Router()

const usersController = require('../controllers/users.js')
const projectController = require('../controllers/projects.js')
// Create, Read, Update, Delete 311-2 CRUD

router.post('/users', usersController.createUser)
router.get('/users', usersController.listUsers)
router.get('/users/:id', usersController.getUserByID)
router.delete('/users/:id', usersController.deleteUserByID)
router.put('users/username/:id', usersController.updateUsernameByID)
router.put('users/email/:id', usersController.updateEmailByID)
router.put('users/theme/:id', usersController.updateThemeByID)
// get one user
// put(update) user
// post(delete) user

module.exports = router


// 311-4 Routes and Controllers