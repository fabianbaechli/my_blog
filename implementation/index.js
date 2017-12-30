const express = require('express')
const app = express()
const session = require('express-session')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const hash = require('sha256')
const database = require('./database.js')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: "f9aa079ea7d98f622427314ae5d07bb43bb343b34cf9365a7",
    cookieName: 'session',
    cookie: {
        maxAge: 1000000
    },
    resave: true,
    saveUninitialized: true
}));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "HackableChat"
})
connection.connect()

app.use(express.static('./react_frontend/src/client/public'));

app.listen(8080, () => {
  console.log("Server listening on port 8080")
})

app.get("/", (req, res) => {
  console.log("hello world")
})
