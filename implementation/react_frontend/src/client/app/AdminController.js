import React from 'react'
import bigInt from 'big-integer'

import c from '../model/Constants.js'
import { authenticate, getCryptoKeys } from '../model/DataSource.js'
import { createPrivateKey, createPublicKey, createSharedKey, encrypt } from '../model/Crypto.js'
import style from "../style/AdminController.scss"

import Header from "./Header"
import ContentContainer from './ContentContainer'
import Footer from './Footer'

export default class AdminController extends React.Component {
  constructor(props) {
    super(props)
    this.state = {username: '', password: ''}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    getCryptoKeys((keys) => {
      createPrivateKey(keys.n, () => {
        console.log("private key created")
        createPublicKey(keys.n, keys.g, (publicKey) => {
          console.log("public key created")
          createSharedKey(keys.public_key, keys.n, (sharedKey) => {
            console.log("shared key created")
            let encryptedUsername = encrypt(sharedKey, this.state.username)
            let encryptedPassword = encrypt(sharedKey, this.state.password)
            console.log(encryptedPassword)
            console.log(encryptedUsername)
            authenticate(encryptedUsername, encryptedPassword, publicKey, (response) => {
              console.log(response)
              if (response !== this.props.authenticated) {
                this.props.call_authenticated_change(response)
              }
            })
          })
        })
      })
    })
  }

  handleChange(event) {
    if (event.target.name === "username") {
      this.setState({username: event.target.value})
    } else {
      this.setState({password: event.target.value})
    }
  }

  render() {
    let header = null
    if (this.props.authenticated) {
      header = "authenticated"
    } else {
      header = "not authenticated!"
    }
    return (
      <div className="AdminController">
        <Header
          header_content = "Admin"
          active_subheader = "two"
        />
        <ContentContainer>
          <div className="content">
            <h2>{header}</h2>
            <form onSubmit={this.handleSubmit}>
              <div className="field">
                <input
                  placeholder="Username"
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <input
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
              <br/>
              <div className="field">
                <input type="submit" value="Submit" />
              </div>
            </form>
          </div>
        </ContentContainer>
        <Footer />
      </div>
    )
  }
}
