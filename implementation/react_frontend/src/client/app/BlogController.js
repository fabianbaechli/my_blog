import React from 'react'
import ReactMarkdown from 'react-markdown'

import c from '../model/Constants.js'
import { createEntry, getEntries } from '../model/DataSource.js'
import style from "../style/BlogController.scss"

import Header from "./Header.js"
import ContentContainer from './ContentContainer'
import Overlay from './Overlay'

export default class BlogController extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      header: '',
      content: '',
      change_entry_header: '',
      change_entry_body: '',
      entries: []
    }
    this.handleCreateSubmit = this.handleCreateSubmit.bind(this)
  }

  componentDidMount() {
    getEntries((response) => {
      let gradients = [
        {background: 'linear-gradient(to right, #9C27B0 , #FF4081)'},
        {background: 'linear-gradient(to right, #00C9FF , #92FE9D)'}
      ]
      response.entries.forEach((entry, i) => {
        let entries = this.state.entries
        let alterEntryButton = undefined
        if (this.props.authenticated) {
          alterEntryButton =
          <button
            className="material_button"
            onClick={() => this.toggleAlterEntryOverlay(entry.header, entry.body)}
          >Change Entry</button>
        }
        entry.creation_date = entry.creation_date.split("T")[0]
        entries.push(<div className="post" key={i}>
          <div className="content_gradient_header" style={gradients[i]}/>
          <div className="content">
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
            {alterEntryButton}
          </div>
        </div>)
        this.setState({entries: entries})
      })
    })
  }

  handleCreateSubmit(event, header, body) {
    event.preventDefault()
    createEntry(header, body, (response) => {
      console.log(response)
      if (response === true) {
        this.props.toggle_create_entry_overlay()
      }
    })
  }

  toggleAlterEntryOverlay(header, body) {
    this.setState({change_entry_header: header, change_entry_body: body})
    this.props.toggle_create_entry_overlay()
  }

  render() {
    let changeEntryOverlay = undefined
    if (this.props.authenticated) {
      changeEntryOverlay =
      <Overlay
        title={"Change Entry"}
        header={this.state.change_entry_header}
        body={this.state.change_entry_body}
        toggle_overlay={this.props.toggle_create_entry_overlay}
        show_overlay={this.props.show_create_entry_overlay}
        handleSubmit={this.handleCreateSubmit}
      />
    }
    return (
      <div className="BlogController">
        <Header
          header_content = "My Blog"
          hr_width = {52.36}
          hr_margin = {-207}
        />
        <ContentContainer>
          <div>
            {this.state.entries}
          </div>
        </ContentContainer>
        {this.props.children}
        <Overlay
          title={"Create Entry"}
          header={""}
          body={""}
          toggle_overlay={this.props.toggle_create_entry_overlay}
          show_overlay={this.props.show_create_entry_overlay}
          handleSubmit={this.handleCreateSubmit}
        />
        {changeEntryOverlay}
    </div>
    )
  }
}
