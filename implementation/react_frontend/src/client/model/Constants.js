// Backend communication
export let BackendURL = "http://localhost:8080"
export let ContentType = "application/json"
export let NotAuthenticated = 0x00
export let Authenticated    = 0x01

// Application variables
export let MaxHeaderLength = 20

export default {
  BackendURL,
  ContentType,
  NotAuthenticated,
  Authenticated,
  MaxHeaderLength
}
