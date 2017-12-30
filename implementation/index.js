const express    = require('express')
const session    = require('express-session')
const bodyParser = require('body-parser')
const mysql      = require('mysql')
const hash       = require('sha256')
// const connection = require('odbc')(), cn = "DSN=myodbc"
const connection = require('odbc')(),
  cn = "DRIVER={libdevartodbcmysql.x64.dylib};SERVER=localhost;UID=root;PWD=root;DATABASE=my_blog";
const app        = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

connection.open(cn, function (err) {
  if (err) return console.log(err);
});

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
  authenticate("fabian", "abc123", (rows) => {
  })
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
  } else {
    res.json({authenticated: true})
  }
})

function authenticate(username, password, callback) {
  const queryString = "CALL authenticate("+ mysql.escape(username) +","+ mysql.escape(hash(password)) +")"
  connection.query(queryString, (err, rows) => {
    if (err) throw console.log(err)
    else callback(rows)
  })
}

app.use(express.static('./react_frontend/src/client/public'));
app.listen(8080, () => {
  console.log("Server listening on port 8080")
})
