const express    = require('express')
const app        = express()
const session    = require('express-session')
const bodyParser = require('body-parser')
const mysql      = require('mysql')
const hash       = require('sha256')
// const connection = require('odbc')(), cn = "DSN=myodbc"
const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "root",
  database: "my_blog"
})

app.use(express.static('./react_frontend/src/client/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
/*
connection.open(cn, function (err) {
  if (err) return console.log(err);
});
*/
connection.connect((err) => {
  if (err) throw err
})

app.use(session({
  secret: "f9aa079ea7d98f622427314ae5d07bb43bb343b34cf9365a7",
  cookieName: 'session',
  cookie: {
    maxAge: 1000000
  },
  resave: true,
  saveUninitialized: true
}));

app.get("/", (req, res) => {
})

app.get("/about", (req, res) => {
  res.redirect("/")
})

app.get("/admin", (req, res) => {
  res.redirect("/")
})

app.get("/authenticated", (req, res) => {
  if (req.session.authenticated) {
    res.json({authenticated: true})
  } else {
    res.json({authenticated: false})
  }
})

app.post("/authenticate", (req, res) => {
  if (!req.session.authenticated) {
    authenticate(req.body.username, req.body.password, (rows) => {
      if (rows[0].length > 0) {
        res.json({success: true})
      } else {
        res.json({success: false})
      }
    })
  } else {
    res.json({success: true})
  }
})

function authenticate(username, password, callback) {
  const queryString = "CALL authenticate("+ mysql.escape(username) +","+ mysql.escape(hash(password)) +")"
  connection.query(queryString, (err, rows) => {
    if (err) throw console.log(err)
    else callback(rows)
  })
}

app.listen(8080, () => {
  console.log("Server listening on port 8080")
})
