const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

const createProject = (req, res) => {

  let sql = "INSERT INTO Projects (Title, ProjectTimeframe, ProjectMaxCharacters, ProjectFont, TrusteeName, TrusteeEmail, Text_ID, Users_ID ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);"

  sql = mysql.format(sql, [req.body.title, req.body.projectTimeframe, req.body.projectMaxCharacters, req.body.projectFont, req.body.trusteeName, req.body.trusteeEmail, req.body.textID, req.body.userID])

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

const getProjectByProjectId = (req, res) => {
  let sql = "SELECT * FROM Projects WHERE idProjects = ?"

  sql = mysql.format(sql, [req.params.id])
  console.log("querying project by project id")
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const updateProjectByProjectId = (req, res) => {
  let sql = "UPDATE Projects SET Title = ?, ProjectTimeframe = ?, ProjectMaxCharacters = ?, ProjectFont = ?, TrusteeName = ?, TrusteeEmail = ?, Text_ID = ?, Users_ID = ? WHERE idProjects = ?;"

  sql = mysql.format(sql, [req.body.title, req.body.projectTimeframe, req.body.projectMaxCharacters, req.body.projectFont, req.body.trusteeName, req.body.trusteeEmail, req.body.textID, req.body.userID, req.params.id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })


}

const deleteProjectByProjectId = (req, res) => {
  let sql = "DELETE FROM Projects where idProjects = ?"
  console.log("deleting project")
  sql = mysql.format(sql, [req.params.id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Deleted ${results.affectedRows} project(s)` });
  })

}

const deleteProjectByUsers_ID = (req, res) => {
  let sql = "DELETE FROM Projects where Users_ID = ?"
  console.log("deleting projects")
  sql = mysql.format(sql, [req.params.id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Deleted ${results.affectedRows} project(s)` });
  })

}

module.exports = {
  createProject,
  listProjects,
  getProjectByProjectId,
  updateProjectByProjectId,
  deleteProjectByProjectId,
  deleteProjectByUsers_ID
}
