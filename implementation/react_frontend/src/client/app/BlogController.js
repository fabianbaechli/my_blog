import React from 'react'
import ReactMarkdown from 'react-markdown'

import c from '../model/Constants.js'
import { createEntry, getEntries } from '../model/DataSource.js'
import style from "../style/BlogController.scss"

import Header from "./Header.js"
import ContentContainer from './ContentContainer'

export default class BlogController extends React.Component {
  constructor(props) {
    super(props)
    this.state = {header: '', content: '', entries: []}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    getEntries((response) => {
      /*
      let gradients = [
        {background: "linear-gradient(to right, #74ebd5 , #ACB6E5);"},
        {background: "linear-gradient(to right, #22c1c3 , #fdbb2d);",
        {background: "linear-gradient(to right, #7F00FF , #E100FF);",
        {background: "linear-gradient(to right, #d9a7c7 , #fffcdc);"
      ]
      */
      response.entries.forEach((entry, i) => {
        let entries = this.state.entries
        entries.push(<div>
          <div className="content_gradient_header" />
          <div className="content" key={i}>
            <div className="post_gradient_header" />
            <div className="post_header">
              <ReactMarkdown source={entry.header} />
            </div>
            <div className="post_date">
              {entry.creation_date}
            </div>
            <div className="post_body">
              <ReactMarkdown source={entry.body} />
            </div>
          </div>
        </div>)
        this.setState({entries: entries})
      })
    })
  }

  handleChange(event) {
    if (event.target.name === "header") {
      this.setState({header: event.target.value})
    } else {
      this.setState({content: event.target.value})
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    createEntry(this.state.header, this.state.content, (response) => {
      console.log(response)
      if (response === true) {
        this.props.toggle_overlay()
      }
    })
  }

  render() {
    return (
      <div className="BlogController">
        <Header
          header_content = "My Blog"
          underline_element = {"zero"}
          hr_width = {51.31}
        />
        <ContentContainer>
        <div>
          {this.state.entries}
        </div>
        </ContentContainer>
        {this.props.children}
        <div
          onClick={() => this.props.toggle_overlay()}
          className="overlay"
          style={{display: this.props.show_overlay === true ? 'block' : 'none'}}
        >
          <div onClick={(event) => event.stopPropagation()} className="overlay_content">
            <h1>Create entry</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="field">
                <input
                  placeholder="# Header"
                  type="text"
                  name="header"
                  value={this.state.header}
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <textarea
                  id="create_entry_content"
                  placeholder="Content"
                  type="text"
                  name="content"
                  value={this.state.content}
                  onChange={this.handleChange}
                />
              </div>
              <br/>
              <div className="field">
                <input type="submit" value="Submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
