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
    return (
      <div className="BlogController">
        <Header
          header_content="Admin"
          underline_element = {"two"}
          hr_width = {76.05}
        />
        <ContentContainer>
          <div className="content">
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
              <input type="submit" value="Submit" />
            </form>
          </div>
        </ContentContainer>
      </div>
    )
  }
}
