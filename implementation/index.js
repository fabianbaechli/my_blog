const express    = require('express')
const app        = express()
const session    = require('express-session')
const bodyParser = require('body-parser')
const mysql      = require('mysql')
const hash       = require('sha256')
const random     = require('randbytes')
const crypto     = require('crypto')
const randomSrc  = random.urandom.getInstance()
const bigInt     = require('big-integer')
const public_g   = bigInt(19)
let public_n     = undefined
let privateKey   = undefined
let publicKey    = undefined
let algorithm    = 'aes-256-ctr',
  password = ""

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
        req.session.authenticated = true
        res.json({success: true})
      } else {
        res.json({success: false})
      }
    })
  } else {
    res.json({success: true})
  }
})

app.post("/create_entry", (req, res) => {
  if (req.session.authenticated) {
    console.log(req.body.header)
    console.log(req.body.content)
    createEntry(req.body.header, req.body.content, (rows) => {
      console.log(rows.affectedRows)
      if (rows.affectedRows > 0) {
        res.json({success: true})
      } else {
        res.json({success: false})
      }
    })
  } else {
    res.json({success: false})
  }
})

app.get("/get_entries", (req, res) => {
  get_entries((rows) =>  {
    res.json({entries: rows[0]})
  })
})

app.get("/crypto_keys", (req, res) => {
  res.json({g: public_g.toString(), n: public_n.toString(), public_key: publicKey.toString()})
})

function authenticate(username, password, callback) {
  const queryString = "CALL authenticate(" +
    mysql.escape(username) + "," +
    mysql.escape(hash(password)) + ")"
  connection.query(queryString, (err, rows) => {
    if (err) throw err
    else callback(rows)
  })
}

function get_entries(callback) {
  const queryString = "CALL get_entries()"
  connection.query(queryString, (err, rows) => {
    if (err) throw err
    else callback(rows)
  })
}

function createEntry(header, body, callback) {
  const queryString = "CALL create_entry(" +
    mysql.escape(header) + "," +
    mysql.escape(body) + ")"
  connection.query(queryString, (err, rows) => {
    if (err) throw err
    else callback(rows)
  })
}

function createCryptoKeys() {
  randomSrc.getRandomBytes(500, buffer => {
    let bufferNumbers = buffer.toJSON(buffer).data
    let bufferStringRepresentation = ""
    bufferNumbers.forEach((number) => {
      bufferStringRepresentation = bufferStringRepresentation + number.toString()
    })
    public_n = bigInt(bufferStringRepresentation)
    privateKey = bigInt.randBetween(public_n.divide(4), public_n)
    publicKey = bigInt(expmod(public_g, privateKey, public_n))
    console.log("calculated crypto keys")
    password = new Buffer(publicKey.toString())
  })
}

function encrypt(text){
  var cipher = crypto.createCipher(algorithm, password)
  var crypted = cipher.update(text, 'utf8', 'hex')
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(text){
  var decipher = crypto.createDecipher(algorithm, password)
  var dec = decipher.update(text, 'hex', 'utf8')
  dec += decipher.final('utf8');
  return dec;
}

// Efficient way of solving (base^exp) % mod
function expmod(base, exp, mod) {
  if (exp == 0) return 1;
  if (exp.mod(2) == 0) {
    return bigInt(expmod(base, (exp.divide(2)), mod)).pow(2).mod(mod)
  }
  else {
    return bigInt(base.multiply(expmod(base, (exp.minus(1)), mod))).mod(mod)
  }
}

app.listen(8080, () => {
  createCryptoKeys()
  console.log("Server listening on port 8080")
})
