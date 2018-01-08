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
    this.state = {authenticated: false, show_overlay: false}
    this.handleAuthenticationChange = this.handleAuthenticationChange.bind(this)
    this.handleCreateEntryButton = this.handleCreateEntryButton.bind(this)
    this.toggleOverlay = this.toggleOverlay.bind(this)
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

  toggleOverlay() {
    this.setState({show_overlay: !this.state.show_overlay})
  }

  render() {
    let createEntryButton = undefined
    if (this.state.authenticated) {
      createEntryButton = <button onClick={() => this.toggleOverlay()} id="create_button">Create Entry</button>
    }
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() =>
            <BlogController
              authenticated={this.state.authenticated}
              show_overlay={this.state.show_overlay}
              toggle_overlay={this.toggleOverlay}>
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
