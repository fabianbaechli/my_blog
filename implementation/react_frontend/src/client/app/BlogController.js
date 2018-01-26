import React from 'react'
import ReactMarkdown from 'react-markdown'
import { findDOMNode } from 'react-dom'

import c from '../model/Constants.js'
import { createEntry, changeEntry, getEntries } from '../model/DataSource.js'
import style from "../style/BlogController.scss"

import Header from "./Header.js"
import ContentContainer from './ContentContainer'
import Overlay from './Overlay'
import Footer from './Footer'

const gradients = [
  {background: 'linear-gradient(to right, #9C27B0 , #FF4081)'},
  {background: 'linear-gradient(to right, #3494E6 , #EC6EAD)'}
]

export default class BlogController extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      header: '',
      content: '',
      change_entry_id: undefined,
      change_entry_header: '',
      change_entry_body: '',
      display_change_entry_overlay: false,
      display_create_entry_overlay: false,
      entries: []
    }

    this.handleCreateSubmit = this.handleCreateSubmit.bind(this)
    this.handleChangeSubmit = this.handleChangeSubmit.bind(this)
    this.toggleOverlay = this.toggleOverlay.bind(this)
    this.prepareChangeEntryOverlay = this.prepareChangeEntryOverlay.bind(this)
    this.displayEntries = this.displayEntries.bind(this)
  }

  componentDidMount() {
    this.displayEntries()
  }

  displayEntries() {
    getEntries((response) => {
      response.entries.forEach((entry, i) => {
        let entries = this.state.entries
        let alterEntryButton = undefined
        if (this.props.authenticated) {
          alterEntryButton =
          <div>
            <br/>
            <button
              className="material_button"
              onClick={() => this.prepareChangeEntryOverlay(entry.header, entry.body, entry.id)}
            >Change Entry</button>
          </div>
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
      document.querySelectorAll('pre').forEach(block => {
        hljs.highlightBlock(block)
      })
    })
  }

  handleCreateSubmit(event, header, body) {
    event.preventDefault()
    createEntry(header, body, (response) => {
      console.log(response)
      if (response === true) {
        this.setState({entries: []})
        this.displayEntries()
        this.toggleOverlay("create")
      }
    })
  }

  handleChangeSubmit(event, header, body) {
    event.preventDefault()
    changeEntry(this.state.change_entry_id, header, body, (response) => {
      if (response === true) {
        this.setState({entries: []})
        this.displayEntries()
        this.toggleOverlay("change")
      }
    })
  }

  prepareChangeEntryOverlay(header, body, id) {
    this.setState({
      change_entry_header: header,
      change_entry_body: body,
      change_entry_id: id
    })
    this.toggleOverlay("change")
  }

  toggleOverlay(overlay) {
    if (overlay === "change") {
      this.setState({display_change_entry_overlay: !this.state.display_change_entry_overlay})
    } else {
      this.setState({display_create_entry_overlay: !this.state.display_create_entry_overlay})
    }
  }

  render() {
    let changeEntryOverlay, createEntryOverlay, createEntryButton = undefined
    if (this.props.authenticated) {
      changeEntryOverlay = <Overlay
        title={"Change Entry"}
        header={this.state.change_entry_header}
        body={this.state.change_entry_body}
        toggle_overlay={() => this.toggleOverlay("change")}
        show_overlay={this.state.display_change_entry_overlay}
        handleSubmit={this.handleChangeSubmit}
      />
      createEntryOverlay = <Overlay
        title={"Create Entry"}
        header={""}
        body={""}
        toggle_overlay={() => this.toggleOverlay("create")}
        show_overlay={this.state.display_create_entry_overlay}
        handleSubmit={this.handleCreateSubmit}
      />
      createEntryButton = <button
        onClick={() => this.toggleOverlay("create")}
        id="create_entry_button"
        className="material_button">
        Create Entry
      </button>
    }
    return (
      <div className="BlogController">
        <Header
          header_content = "My Blog"
          active_subheader = "zero"
        />
        <ContentContainer>
          <div>
            {this.state.entries}
          </div>
        </ContentContainer>
      {createEntryButton}
      {createEntryOverlay}
      {changeEntryOverlay}
      <Footer />
    </div>
    )
  }
}
