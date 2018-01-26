import React from 'react'
import ReactMarkdown from 'react-markdown'

import c from '../model/Constants.js'
import style from "../style/BlogController.scss"

import ContentContainer from './ContentContainer'

export default class BlogController extends React.Component {
  constructor(props) {
    super(props)
    this.state = {header: '', body: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    if (event.target.name === "header") {
      this.setState({header: event.target.value})
    } else {
      this.setState({body: event.target.value})
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({header: nextProps.header, body: nextProps.body})
  }

  handleSubmit(event) {
    this.props.handleSubmit(event, this.state.header, this.state.body)
  }

  render() {
    return (
      <div
        onClick={() => this.props.toggle_overlay()}
        className="overlay"
        style={{display: this.props.show_overlay === true ? 'block' : 'none'}}
      >
        <div onClick={(event) => event.stopPropagation()} className="overlay_content">
          <h1>{this.props.title}</h1>
          <form onSubmit={this.handleSubmit}>
            <div style={{"font-family": "Inconsolata"}} className="field">
              <input
                placeholder="# Header"
                type="text"
                name="header"
                value={this.state.header}
                onChange={this.handleChange}
              />
            </div>
            <div style={{"font-family": "Inconsolata"}} className="field">
              <textarea
                id="create_entry_content"
                placeholder="## Content"
                type="text"
                name="content"
                value={this.state.body}
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
    )
  }
}
