import React from 'react'
import ReactDOM from 'react-dom'

import c from '../model/Constants.js'
import style from "../style/Header.scss"
import { Link } from 'react-router-dom'
import SubheaderSlider from './SubheaderSlider'

export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {active_subheader: undefined}
  }

  componentDidMount() {
    this.setState({active_subheader: this[this.props.active_subheader]})
  }

  render() {
    return (
      <div id="header">
        <a href="/" id="header_content">My Blog</a>
        <div id="sub_content_bar">
          <Link ref={subheader => this.zero = subheader} id="zero" className="sub_content" to="/">Blog</Link>
          <Link ref={subheader => this.one = subheader} id="one" className="sub_content" to="/about">About</Link>
          <Link ref={subheader => this.two = subheader} id="two" className="sub_content" to="/admin">Admin</Link>
          <SubheaderSlider
            hr_width  = {this.props.hr_width}
            hr_margin = {this.props.hr_margin}
            subheader = {this.state.active_subheader}
          />
        </div>
      </div>
    )
  }
}
