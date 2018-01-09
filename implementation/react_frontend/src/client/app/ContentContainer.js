import React from 'react'

import c from '../model/Constants.js'
import style from "../style/ContentContainer.scss"

export default class ContentContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let renderContent = []
    if (this.props.content !== undefined) {
      this.props.content.map((entry, i) => {
        renderContent.push(<div className="content" key={i}>{entry.content}</div>)
      })
    } if (this.props.children !== undefined){
      renderContent.push(this.props.children)
    }
    return <div id="content_container">{renderContent}</div>
  }
}
