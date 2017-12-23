import React from 'react';
import {render} from 'react-dom';
import { BlogController } from './BlogController.js'
import { AboutController } from './AboutController.js'
import style from "../style/main.scss"
import { BrowserRouter, Switch, Route } from 'react-router-dom'

render((
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={BlogController}/>
      <Route path='/about' component={AboutController}/>
    </Switch>
  </BrowserRouter>
), document.getElementById('react_main_container'))
