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
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={BlogController}/>
          <Route exact path='/about' component={AboutController}/>
          <Route exact path='/admin' component={AdminController}/>
        </Switch>
      </BrowserRouter>
    )
  }
}
