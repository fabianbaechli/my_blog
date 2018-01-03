import React from 'react'
import ReactDOMServer from 'react-dom/server'

import c from '../model/Constants.js'
import style from "../style/Header.scss"
import { Link } from 'react-router-dom'

let margin = 0
let width = 0
let FirstElement =  <Link id="zero" className="sub_content" to="/">Blog</Link>
let SecondElement = <Link id="one" className="sub_content" to="/about">About</Link>
let ThirdElement =  <Link id="two" className="sub_content" to="/admin">Admin</Link>

export default class Header extends React.Component {
  constructor(props) {
    super(props)
    width = this.props.hr_width
    console.log(FirstElement)
    switch (this.props.underline_element) {
      case 0:
        margin = ReactDOMServer.renderToStaticMarkup(FirstElement).getBoundingClientRect().left
        break;
      case 1:
      margin = ReactDOMServer.renderToStaticMarkup(SecondElement).getBoundingClientRect().left
        break;
      case 2:
      margin = ReactDOMServer.renderToStaticMarkup(ThirdElement).getBoundingClientRect().left
        break;
    }
  }

  render() {
    console.log(margin + " " + width);
    return (
      <div id="header">
        <a href="/" id="header_content">{this.props.header_content}</a>
        <div id="sub_content_bar">
          <FirstElement />
          <SecondElement />
          <ThirdElement />
          <hr style={{width: width + 'px', marginLeft: margin + 'px'}}/>

        </div>
      </div>
    )
  }
}
