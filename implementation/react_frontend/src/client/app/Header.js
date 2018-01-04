import React from 'react'
import ReactDOM from 'react-dom'

import c from '../model/Constants.js'
import style from "../style/Header.scss"
import { Link } from 'react-router-dom'
import SubheaderSlider from './SubheaderSlider'

export default class Header extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div id="header">
        <a href="/" id="header_content">{this.props.header_content}</a>
        <div id="sub_content_bar">
          <Link id="zero" className="sub_content" to="/">Blog</Link>
          <Link id="one" className="sub_content" to="/about">About</Link>
          <Link id="two" className="sub_content" to="/admin">Admin</Link>
          <SubheaderSlider
            hr_underline_element = {this.props.underline_element}
            hr_width  = {this.props.hr_width}
          />
        </div>
      </div>
    )
  }
}
