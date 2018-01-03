import React from 'react'

import c from '../model/Constants.js'
import DataSource from '../model/DataSource.js'
import style from "../style/BlogController.scss"

import Header from "./Header.js"
import ContentContainer from './ContentContainer'

export const BlogController = () => (
  <div className="BlogController">
    <Header
      header_content = "My Blog"
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
  </div>
)
