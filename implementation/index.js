const express    = require('express')
const app        = express()
const session    = require('express-session')
const bodyParser = require('body-parser')
const connection = require('./database')
const random     = require('randbytes')
const crypto     = require('crypto')
const randomSrc  = random.urandom.getInstance()
const bigInt     = require('big-integer')
const public_g   = bigInt(19)
const keySize    = 120
let public_n     = undefined
let privateKey   = undefined
let publicKey    = undefined
let algorithm    = 'aes-256-ctr',
  password = ""

app.use(express.static('./react_frontend/src/client/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

connection.connect((err) => {
  if (err) {
    throw err
  } else {
    // queries the database every five seconds to ensure, that the connection is not lost
    setInterval(function () {
      connection.query('SELECT 1');
    }, 5000);
  }
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
    createSharedKey(req.body.public_key, () => {
      let username = decrypt(req.body.username)
      let password = decrypt(req.body.password)
      console.log(username + " " + password)
      connection.authenticate(username, password, (rows) => {
        if (rows[0].length > 0) {
          req.session.authenticated = true
          res.json({success: true})
        } else {
          res.json({success: false})
        }
      })
    })
  } else {
    res.json({success: true})
  }
})

app.post("/create_entry", (req, res) => {
  if (req.session.authenticated) {
    connection.createEntry(req.body.header, req.body.content, (rows) => {
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

app.post("/change_entry", (req, res) => {
  if (req.session.authenticated) {
    connection.changeEntry(req.body.entry_id, req.body.header, req.body.body, (rows) => {
      res.json({success: true})
    })
  } else {
    res.json({success: false})
  }
})

app.get("/get_entries", (req, res) => {
  connection.getEntries((rows) =>  {
    res.json({entries: rows[0]})
  })
})

app.get("/crypto_keys", (req, res) => {
  res.json({g: public_g.toString(), n: public_n.toString(), public_key: publicKey.toString()})
})

function createCryptoKeys() {
  randomSrc.getRandomBytes(keySize, buffer => {
    let bufferNumbers = buffer.toJSON(buffer).data
    let bufferStringRepresentation = ""
    bufferNumbers.forEach((number) => {
      bufferStringRepresentation = bufferStringRepresentation + number.toString()
    })
    public_n = bigInt(bufferStringRepresentation)
    privateKey = bigInt.randBetween(public_n.divide(4), public_n)
    publicKey = bigInt(expmod(public_g, privateKey, public_n))
    console.log("calculated crypto keys")
  })
}

function createSharedKey(clientPublicKey, callback) {
  let sharedKey = expmod(bigInt(clientPublicKey), privateKey, public_n)
  password = new Buffer(sharedKey.toString())
  callback()
}

function encrypt(text) {
  var cipher = crypto.createCipher(algorithm, password)
  var crypted = cipher.update(text, 'utf8', 'hex')
  crypted += cipher.final('hex')
  return crypted
}

function decrypt(text) {
  var decipher = crypto.createDecipher(algorithm, password)
  var dec = decipher.update(text, 'hex', 'utf8')
  dec += decipher.final('utf8')
  return dec
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
