import React from 'react';
import {render} from 'react-dom';
import { BlogController } from './BlogController.js'
import { AboutController } from './AboutController.js'
import { AdminController } from './AdminController.js'
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
