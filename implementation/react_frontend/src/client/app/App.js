import React from 'react'

import c from '../model/Constants'
import { checkAuthentication, authenticate } from '../model/DataSource'
import BlogController from './BlogController'
import AboutController from './AboutController'
import AdminController from './AdminController'
import { BrowserRouter, Switch, Route } from  'react-router-dom'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      authenticated: false,
      show_create_entry_overlay: false,
      show_change_entry_overlay: false
    }
    this.handleAuthenticationChange = this.handleAuthenticationChange.bind(this)
    this.handleCreateEntryButton = this.handleCreateEntryButton.bind(this)
    this.toggleCreateEntryOverlay = this.toggleCreateEntryOverlay.bind(this)
    this.toggleChangeEntryOverlay = this.toggleChangeEntryOverlay.bind(this)
  }

  componentDidMount() {
    checkAuthentication((response) => {
      this.setState({authenticated: response.authenticated})
    })
  }

  handleAuthenticationChange(change) {
    this.setState({authenticated: change})
  }

  handleCreateEntryButton() {
    if (this.state.authenticated) {
      return <button>Create Entry</button>
    } else {
      return null
    }
  }

  toggleCreateEntryOverlay() {
    this.setState({show_create_entry_overlay: !this.state.show_create_entry_overlay})
  }

  toggleChangeEntryOverlay() {
    this.setState({toggleChangeEntryOverlay: !toggleChangeEntryOverlay})
  }

  render() {
    let createEntryButton = undefined
    if (this.state.authenticated) {
      createEntryButton = <button onClick={() => this.toggleCreateEntryOverlay()} id="create_button">Create Entry</button>
    }
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() =>
            <BlogController
              authenticated={this.state.authenticated}
              show_create_entry_overlay={this.state.show_create_entry_overlay}
              show_change_entry_overlay={this.state.show_change_entry_overlay}
              toggle_create_entry_overlay={this.toggleCreateEntryOverlay}
              toggle_change_entry_overlay={this.toggleChangeEntryOverlay}>
              {createEntryButton}
            </BlogController>
          }/>

          <Route exact path="/about" render={() =>
            <AboutController
              authenticated={this.state.authenticated}
            />
          }/>

          <Route exact path="/admin" render = {() =>
            <AdminController
              authenticated={this.state.authenticated}
              call_authenticated_change={this.handleAuthenticationChange}
            />
          }/>
        </Switch>
      </BrowserRouter>
    )
  }
}
