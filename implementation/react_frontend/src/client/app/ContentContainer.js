import React from 'react'

import c from '../model/Constants.js'
import style from "../style/ContentContainer.scss"

let content = undefined

export default class ContentContainer extends React.Component {
  constructor(props) {
    super(props)
    content = this.props.content
    console.log(content)
  }

  render() {
    return (
      <div id="Content">
        {this.props.children}
      </div>
    )
  }
}
