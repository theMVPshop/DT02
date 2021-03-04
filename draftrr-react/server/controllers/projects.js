const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')



const createProject = (req, res) => {

  let sql = "INSERT INTO Projects (Title, ProjectTimeframe, ProjectMaxCharacters, ProjectFont, TrusteeName, TrusteeEmail, TextFilePath, Users_ID ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);"

  sql = mysql.format(sql, [req.body.title, req.body.projectTimeframe, req.body.projectMaxCharacters, req.body.projectFont, req.body.trusteeName, req.body.trusteeEmail, req.body.textFilePath, req.body.userID])
  
  console.log("hit create project", sql)

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
