import { backend_get, backend_post } from './Utils.js'
import c from './Constants.js'

export const getEntries = (callback) => {
  backend_get("get_entries", (response) => {
    callback(response)
  })
}

export const changeEntry = (entryId, changes, callback) => {
  backend_post("", {entry_id: entryId, entries_to_change : changes}, (response) => {
    callback(response.success)
  })
}

export const createEntry = (header, content, callback) => {
  backend_post("create_entry", {header: header, content: content}, (response) => {
    callback(response.success)
  })
}

export const authenticate = (username, password, publicKey, callback) => {
  backend_post(
    "authenticate",
    {"username": username, "password": password, public_key: publicKey},
    (response) => {
      callback(response.success)
    })
}

export const checkAuthentication = (callback) => {
  backend_get("authenticated", (response) => {
    callback(response)
  })
}

export const getCryptoKeys = (callback) => {
  backend_get("crypto_keys", (response) => {
    callback(response)
  })
}
