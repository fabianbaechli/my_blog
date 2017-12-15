import React from 'react'

import c from '../model/Constants.js'
import style from "../style/Header.scss"

export default class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="Header">
        <a href="/" id="header_content">{this.props.header_content}</a>
      </div>
    )
  }
}
