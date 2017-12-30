import React from 'react'

import c from '../model/Constants.js'
import style from "../style/Header.scss"
import { Link } from 'react-router-dom'

export default class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="header">
        <a href="/" id="header_content">{this.props.header_content}</a>
        <div id="sub_content_bar">
          <Link className="sub_content" to="/">Blog</Link>
          <Link className="sub_content" to="/about">About</Link>
          <Link className="sub_content" to="/admin">Admin</Link>
        </div>
      </div>
    )
  }
}
