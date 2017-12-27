import React from 'react'

import c from '../model/Constants.js'
import style from "../style/ContentContainer.scss"

export default class ContentContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="content_container">
        {this.props.children}
      </div>
    )
  }
}
