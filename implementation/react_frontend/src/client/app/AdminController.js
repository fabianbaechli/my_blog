import React from 'react'

import c from '../model/Constants.js'
import { authenticate } from '../model/DataSource.js'
import style from "../style/AdminController.scss"

import Header from "./Header"
import ContentContainer from './ContentContainer'

export default class AdminController extends React.Component {
  constructor(props) {
    super(props)
    this.state = {username: '', password: ''}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    authenticate(this.state.username, this.state.password, (response) => {
      console.log(response)
      if (response !== this.props.authenticated) {
        this.props.call_authenticated_change(response)
      }
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
      <div className="BlogController">
        <Header
          header_content = "Admin"
          underline_element = {2}
          hr_width = {76.05}
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
      </div>
    )
  }
}
