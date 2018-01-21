const crypto    = require('crypto')
const bigInt    = require('big-integer')
let privateKey  = undefined
let publicKey   = undefined
let algorithm    = 'aes-256-ctr'
let password

export const createPrivateKey = (public_n, callback) => {
  public_n = bigInt(public_n)
  privateKey = bigInt.randBetween(public_n.divide(4), public_n)
  callback()
}

export const createPublicKey = (public_n, public_g, callback) => {
  publicKey = bigInt(expmod(bigInt(public_g), privateKey, bigInt(public_n)))
  callback(publicKey.toString())
}

export const createSharedKey = (server_public_key, server_n, callback) => {
  let sharedKey = expmod(bigInt(server_public_key), privateKey, bigInt(server_n))
  console.log(sharedKey.toString())
  password = new Buffer(sharedKey.toString())
  callback(sharedKey.toString())
}

export const encrypt = (key, message) => {
  var cipher = crypto.createCipher(algorithm, key)
  var crypted = cipher.update(message, 'utf8', 'hex')
  crypted += cipher.final('hex');
  return crypted;
}

export const decrypt = (key, message) => {
  var decipher = crypto.createDecipher(algorithm, key)
  var dec = decipher.update(message, 'hex', 'utf8')
  dec += decipher.final('utf8');
  return dec;
}

function expmod(base, exp, mod) {
  if (exp == 0) return 1;
  if (exp.mod(2) == 0) {
    return bigInt(expmod(base, (exp.divide(2)), mod)).pow(2).mod(mod)
  }
  else {
    return bigInt(base.multiply(expmod(base, (exp.minus(1)), mod))).mod(mod)
  }
}
