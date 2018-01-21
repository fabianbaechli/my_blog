const mysql = require('mysql')

const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "root",
  database: "my_blog"
})

connection.authenticate = (username, password, callback) => {
  const queryString = "CALL authenticate(" +
    connection.escape(username) + "," +
    connection.escape(hash(password)) + ")"
  connection.query(queryString, (err, rows) => {
    if (err) throw err
    else callback(rows)
  })
}

connection.getEntries = (callback) => {
  const queryString = "CALL get_entries()"
  connection.query(queryString, (err, rows) => {
    if (err) throw err
    else callback(rows)
  })
}

connection.createEntry = (header, body, callback) => {
  const queryString = "CALL create_entry(" +
    connection.escape(header) + "," +
    connection.escape(body) + ")"
  connection.query(queryString, (err, rows) => {
    if (err) throw err
    else callback(rows)
  })
}

module.exports = connection;
