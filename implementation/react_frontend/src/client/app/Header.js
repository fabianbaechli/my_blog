import React from 'react'
import ReactDOM from 'react-dom'

import c from '../model/Constants.js'
import style from "../style/Header.scss"
import { Link } from 'react-router-dom'
import SubheaderSlider from './SubheaderSlider'

export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.getMargin = this.getMargin.bind(this)
  }

  getMargin() {
    console.log(this.refs)
  }

  componentDidUpdate() {
    console.log(ReactDOM.findDOMNode(this.refs.first_subheader).getBoundingClientRect().left)
  }

  render() {
    return (
      <div id="header">
        <a href="/" id="header_content">{this.props.header_content}</a>
        <div id="sub_content_bar">
          <Link ref="first_subheader" key={1} id="zero" className="sub_content" to="/">Blog</Link>
          <Link ref="second_subheader" key={2} id="one" className="sub_content" to="/about">About</Link>
          <Link ref="third_subheader" key={3} id="two" className="sub_content" to="/admin">Admin</Link>
          <SubheaderSlider
            hr_margin = {12}
            hr_width  = {this.props.hr_width}
          />
        </div>
      </div>
    )
  }
}
