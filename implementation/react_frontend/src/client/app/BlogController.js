import React from 'react'

import c from '../model/Constants.js'
import { createEntry } from '../model/DataSource.js'
import style from "../style/BlogController.scss"

import Header from "./Header.js"
import ContentContainer from './ContentContainer'

export default class BlogController extends React.Component {
  constructor(props) {
    super(props)
    this.state = {header: '', content: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
    console.log(this.props.show_overlay)
    return (
      <div className="BlogController">
        <Header
          header_content = "My Blog"
          underline_element = {"zero"}
          hr_width = {51.31}
        />
        <ContentContainer>
          <div className = "content">
            <h1>This is my first entry</h1>
            <h2>May 2017</h2>
            <h2>Todo</h2>
            <ul>
              <li>Buy some eggos</li>
              <li>Help old ladies over street</li>
              <li>Help old ladies over street</li>
            </ul>
            <pre><code className="language-javascript">foo = bar
            </code></pre>
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
