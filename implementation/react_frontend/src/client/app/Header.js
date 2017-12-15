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
        <p>{this.props.header_content}</p>
      </div>
    )
  }
}
