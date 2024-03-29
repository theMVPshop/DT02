const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

// Create, Read, Update, Delete 311-2

const createUser = (req, res) => {

  let sql = "INSERT INTO Users (ID, Username, Email, Theme, NewUser) VALUES (?, ?, ?, ?;"

  sql = mysql.format(sql, [req.body.id, req.body.name, req.body.theme, req.body.newUser])

  console.log("hit create user", sql)

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}

const listUsers = (req, res) => {
  pool.query('SELECT * FROM Users', (err, rows) => {
    console.log("querying users!")
    if (err) {
      console.log({ 'message': 'Error occurred: ' + err })
      return handleSQLError(res, err)
    }
    res.json(rows)
  });
}

const getUserByID = (req, res) => {
  console.log('response', res)
  let sql = "SELECT * FROM Users WHERE ID = ?"
  console.log("querying user by id", req.params.id)
  sql = mysql.format(sql, [req.params.id])
  console.log('sql', sql)
  console.log("querying user by id", req.params.id)
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    console.log(res)
    return res.json(rows);
  }
  )
}

// const getUserByEmail = (req, res) => {
//   console.log('response', res)
//   let sql = "SELECT * FROM Users WHERE Email = ?"
//   console.log("querying user by id", req.params.email)
//   sql = mysql.format(sql, [req.params.email])
//   console.log('sql', sql)
//   console.log("querying user by id", req.params.email)
//   pool.query(sql, (err, rows) => {
//     if (err) return handleSQLError(res, err)
//     console.log(res)
//     return res.json(rows);
//   }
//   )
// }

const updateUsernameByID = (req, res) => {

  let sql = "UPDATE Users SET Username = ? WHERE ID = ?;"

  sql = mysql.format(sql, [req.body.username, req.params.id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const updateEmailByID = (req, res) => {

  let sql = "UPDATE Users SET Email = ? WHERE ID = ?;"

  sql = mysql.format(sql, [req.body.email, req.params.id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const updateThemeByID = (req, res) => {

  let sql = "UPDATE Users SET Theme = ? WHERE ID = ?;"

  sql = mysql.format(sql, [req.body.theme, req.params.id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deleteUserByID = (req, res) => {

  // let sql = "DELETE Users, Projects FROM Users INNER JOIN Projects ON Projects.Users_ID = Users.ID WHERE Users.ID = ?"
  let sql = "DELETE FROM Users WHERE ID = ?"


  console.log("deleting projects")
  sql = mysql.format(sql, [req.params.id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  })




}



module.exports = {
  createUser,
  listUsers,
  getUserByID,
  updateUsernameByID,
  updateEmailByID,
  updateThemeByID,
  deleteUserByID,
}


