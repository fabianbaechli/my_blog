import React from 'react'

import c from '../model/Constants.js'
import style from "../style/Header.scss"

export default class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="header">
        <a href="/" id="header_content">{this.props.header_content}</a>
        <div id="sub_content_bar">
          <a className="sub_content" href="/">Blog</a>
          <a className="sub_content" href="/about">About</a>
          <a className="sub_content" href="/admin">Admin</a>
        </div>
      </div>
    )
  }
}
