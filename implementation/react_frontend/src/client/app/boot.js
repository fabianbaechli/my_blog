import React from 'react';
import { render } from 'react-dom';
import App from './App'
import style from '../style/main.scss'
import { BrowserRouter, Switch, Route } from  'react-router-dom'

render((
  <App />
), document.getElementById('react_main_container'))
