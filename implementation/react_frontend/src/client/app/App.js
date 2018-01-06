import React from 'react'

import c from '../model/Constants'
import { checkAuthentication, authenticate } from '../model/DataSource'
import BlogController from './BlogController'
import AboutController from './AboutController'
import AdminController from './AdminController'
// import style from '../style/main.scss'
import { BrowserRouter, Switch, Route } from  'react-router-dom'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {authenticated: false}
    this.handleAuthenticationChange = this.handleAuthenticationChange.bind(this)
  }

  componentDidMount() {
    checkAuthentication((response) => {
      this.setState({authenticated: response.authenticated})
    })
  }

  handleAuthenticationChange(change) {
    this.setState({authenticated: change})
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <BlogController authenticated={this.state.authenticated}/>}/>
          <Route exact path="/about" render={() => <AboutController authenticated={this.state.authenticated}/>}/>
          <Route
            exact path="/admin"
            render = {() => <AdminController
                authenticated={this.state.authenticated}
                call_authenticated_change={this.handleAuthenticationChange}
            />}
          />
        </Switch>
      </BrowserRouter>
    )
  }
}
