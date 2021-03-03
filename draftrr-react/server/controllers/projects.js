const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

//controllers/mushrooms.js

const createProject = (req, res) => {

  let sql = "INSERT INTO Projects (genus, species, nickname, habitat, sporeColor, userID) VALUES (?, ?, ?, ?, ?, ?);"

  sql = mysql.format(sql, [req.body.genus, req.body.species, req.body.nickname, req.body.habitat, req.body.sporeColor, req.body.userID])
  
  console.log("hit create mushroom", sql)

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: "New Project Posted!", newId: results.insertId });
  })
}

const listProjects = (req, res) => {
  pool.query('SELECT * FROM Projects', (err, rows) => {
    if (err) {
      console.log({ 'message': 'Error occurred: ' + err })
      return handleSQLError(res, err)
    }
    res.json(rows)
  });
}

const getProject = (req, res) => {}

const updateProject = (req, res) => {}

const deleteProject = (req, res) => {}

module.exports = { 
  createProject, 
  listProjects, 
  getProject, 
  updateProject, 
  deleteProject 
}
