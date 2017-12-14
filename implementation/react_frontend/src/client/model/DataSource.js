import {backend_get, backend_post} from './Utils.js'
import c from './Constants'

export default class DataSource {
  getEntries(callback) {
    backend_get(c.backendURL + "/entries", (response) => {
      // TODO: Do the parsing to HTML here
    })
  }
  changeEntry(entryId, changes, callback) {
    backend_post(c.backendURL, {entry_id: entryId, entries_to_change : changes}, (response) => {
      callback(response.success)
    })
  }
}
