const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

const createProject = (req, res) => {

  let sql = "INSERT INTO Projects (Title, ProjectTimeframe, ProjectMaxCharacters, ProjectFont, TrusteeName, TrusteeEmail, Text_ID, Users_ID, Locked, Submitted ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"

  sql = mysql.format(sql, [req.body.Title, req.body.ProjectTimeframe, req.body.ProjectMaxCharacters, req.body.ProjectFont, req.body.TrusteeName, req.body.TrusteeEmail, req.body.Text_ID, req.body.Users_ID, req.body.Locked, req.body.Submitted])

  console.log("hit create project", sql)

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: "New Project Posted!", newId: results.insertId });
  })
}

// const listProjects = (req, res) => {
//   pool.query('SELECT * FROM Projects', (err, rows) => {
//     if (err) {
//       console.log({ 'message': 'Error occurred: ' + err })
//       return handleSQLError(res, err)
//     }
//     res.json(rows)
//   });
// }

const getProjectByProjectID = (req, res) => {
  let sql = "SELECT * FROM Projects WHERE idProjects = ?"

  sql = mysql.format(sql, [req.params.id])
  console.log("querying project by project id")
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const getProjectByUserID = (req, res) => {
  let sql = "SELECT * FROM Projects WHERE Users_ID = ?"

  sql = mysql.format(sql, [req.params.uid])
  console.log("querying project by user id")
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const updateProjectByProjectID = (req, res) => {
  console.log(req.params.id)
  let sql = "UPDATE Projects SET Title = ?, ProjectTimeframe = ?, ProjectMaxCharacters = ?, ProjectFont = ?, TrusteeName = ?, TrusteeEmail = ?, Text_ID = ?, Locked = ?, Submitted = ? WHERE idProjects = ?;"

  sql = mysql.format(sql, [req.body.Title, req.body.ProjectTimeframe, req.body.ProjectMaxCharacters, req.body.ProjectFont, req.body.TrusteeName, req.body.TrusteeEmail, req.body.Text_ID, req.body.Locked, req.body.Submitted, req.params.id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json();
  })
}

const unlockProject = (req, res) => {
  let sql = "UPDATE Projects SET Locked = ? WHERE idProjects = ?;"

  sql = mysql.format(sql, [req.body.locked, req.params.id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json();
  })
}

const submitProject = (req, res) => {
  let sql = "UPDATE Projects SET Submitted = ? WHERE idProjects = ?;"

  sql = mysql.format(sql, [req.body.submitted, req.params.id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json();
  })
}

const deleteProjectByProjectID = (req, res) => {
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
  // listProjects,
  getProjectByProjectID,
  getProjectByUserID,
  updateProjectByProjectID,
  deleteProjectByProjectID,
  deleteProjectByUsers_ID,
  unlockProject,
  submitProject,
}
