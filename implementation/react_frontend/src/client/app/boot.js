import React from 'react';
import {render} from 'react-dom';
import App from './MainViewController.js'
import Header from './Header.js'
import style from "../style/main.scss"

render(<App/>, document.getElementById('react_main_container'))
render(<Header header_content="Welcome!"/>, document.getElementById('react_main_container'))
