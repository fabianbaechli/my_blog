import { backend_get, backend_post } from './Utils.js'
import c from './Constants.js'

export const getEntries = (callback) => {
  backend_get(c.backendURL + "entries", (response) => {
    // TODO: Do the parsing to HTML here
  })
}

export const changeEntry = (entryId, changes, callback) => {
  backend_post("", {entry_id: entryId, entries_to_change : changes}, (response) => {
    callback(response.success)
  })
}

export const authenticate = (username, password, callback) => {
  backend_post("authenticate", {"username": username, "password": password}, (response) => {
    callback(response.success)
  })
}

export const checkAuthentication = (callback) => {
  backend_get(c.backendURL + "authenticated", (response) => {
    callback(response)
  })
}
