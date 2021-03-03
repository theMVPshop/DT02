const express = require('express')
const router = express.Router()

const projectController = require('../controllers/projects.js')
// Create, Read, Update, Delete 311-2

router.post('/projects', projectController.createProject)
router.get('/projects', projectController.listProjects)
// get one user
// put(update) user
// post(delete) user

module.exports = router
