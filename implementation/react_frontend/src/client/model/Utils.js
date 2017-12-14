import c from "./Constants.js"

export const backend_get = (route, callback) => {
  const xhr = new XMLHttpRequest()
  xhr.open("GET", c.BackendURL + "/" + route, true)
  xhr.addEventListener("load", () => {
    callback(JSON.parse(xhr.responseText, xhr))
  })
  xhr.send()
}

export const backend_post = (route, payload, callback) => {
  const xhr = new XMLHttpRequest()
  xhr.open("POST", c.BackendURL + "/" + route, true)
  xhr.setRequestHeader('Content-Type', c.ContentType);
  xhr.addEventListener("load", () => {
    callback(JSON.parse(xhr.responseText, xhr))
  })
  xhr.send(JSON.stringify(payload))
}
