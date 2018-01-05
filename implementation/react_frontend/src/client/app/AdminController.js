import React from 'react'

import c from '../model/Constants.js'
import DataSource from '../model/DataSource.js'
import style from "../style/AdminController.scss"

import Header from "./Header"
import ContentContainer from './ContentContainer'

export default class AdminController extends React.Component {
  constructor(props) {
    console.log("hello world")
    super(props)
    this.state = {username: '', password: ''}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log(this.state.username + " " + this.state.password)
    // Do the post request here
  }

  handleChange(event) {
    console.log(event)
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
            <form action="/authenticate">
              <div className="field">
                <input placeholder="Username" type="text" name="name" />
              </div>
              <div className="field">
                <input placeholder="Password" type="password" name="name" />
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
