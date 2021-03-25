const express = require('express')
const router = express.Router()

const projectController = require('../controllers/projects.js')
// Create, Read, Update, Delete 311-2

router.post('/projects', projectController.createProject)
router.get('/projects', projectController.listProjects)
router.get('/projects/:id', projectController.getProjectByProjectId)
router.get('/projects/user/:uid', projectController.getProjectByUserID)
router.delete('/projects/:id', projectController.deleteProjectByProjectId)
router.put('projects/:id', projectController.updateProjectByProjectId)
// get one user
// put(update) user
// post(delete) user

module.exports = router
