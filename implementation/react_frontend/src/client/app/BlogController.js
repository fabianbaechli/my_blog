import React from 'react'

import c from '../model/Constants.js'
import DataSource from '../model/DataSource.js'
import style from "../style/BlogController.scss"

import Header from "./Header.js"
import ContentContainer from './ContentContainer'

export default class BlogController extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props.show_overlay)
    return (
      <div className="BlogController">
        <Header
          header_content = "My Blog"
          underline_element = {"zero"}
          hr_width = {51.31}
        />
        <ContentContainer>
          <div className = "content">
            <h1>This is my first entry</h1>
            <h2>May 2017</h2>
            <h2>Todo</h2>
            <ul>
              <li>Buy some eggos</li>
              <li>Help old ladies over street</li>
              <li>Help old ladies over street</li>
            </ul>
            <pre><code className="language-javascript">foo = bar
            </code></pre>
          </div>
        </ContentContainer>
        {this.props.children}
        <div id="overlay" style={{display: this.props.show_overlay === true ? 'block' : 'none'}}>
          overlay
        </div>
      </div>
    )
  }
}
