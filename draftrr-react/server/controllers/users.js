const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

// Create, Read, Update, Delete 311-2

const createUser = (req, res) => {
  
  let sql = "INSERT INTO Users (Username, Email, Password, Theme, UserTimeframe, UserMaxCharacters, UserFont) VALUES (?, ?, ?, ?, ?, ?, ?);"

  sql = mysql.format(sql, [req.body.username, req.body.email, req.body.password, req.body.theme, req.body.userTimeframe, req.body.userMaxCharacters, req.body.userFont])

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

  let sql = "SELECT * FROM Users WHERE ID = ?"
  
  sql = mysql.format(sql, [req.params.id])
  console.log("querying user by id")
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const updateUserByID = (req, res) => {

  let sql = "UPDATE Users SET Username =  ?, Email = ?, Password = ?, Theme = ?, UserTimeframe = ?, UserMaxCharacters = ?, UserFont= ? WHERE ID = ?;"
  
  sql = mysql.format(sql, [req.body.username, req.body.email, req.body.password, req.body.theme, req.body.userTimeframe, req.body.userMaxCharacters, req.body.userFont, req.params.id])

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
  updateUserByID, 
  deleteUserByID,
  
}


