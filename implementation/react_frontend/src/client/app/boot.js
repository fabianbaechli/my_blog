import React from 'react';
import {render} from 'react-dom';
import BlogController from './BlogController'
import AboutController from './AboutController'
import AdminController from './AdminController'
import style from '../style/main.scss'
import { BrowserRouter, Switch, Route } from  'react-router-dom'

render((
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={BlogController}/>
      <Route exact path='/about' component={AboutController}/>
      <Route exact path='/admin' component={AdminController}/>
    </Switch>
  </BrowserRouter>
), document.getElementById('react_main_container'))
