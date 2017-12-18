import React from 'react';
import {render} from 'react-dom';
import { MainViewController } from './MainViewController.js'
import style from "../style/main.scss"
import { BrowserRouter } from 'react-router-dom'

render((
  <BrowserRouter>
    <MainViewController />
  </BrowserRouter>
), document.getElementById('react_main_container'))
