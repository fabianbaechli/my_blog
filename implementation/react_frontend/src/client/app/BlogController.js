import React from 'react'

import c from '../model/Constants.js'
import DataSource from '../model/DataSource.js'
import style from "../style/BlogController.scss"

import Header from "./Header.js"
import Foo from './Foo.js'
import ContentContainer from './ContentContainer'

export const BlogController = () => (
  <div className="BlogController">
    <Header
      header_content = "Fabian Bächli - My Blog"
    />
    <ContentContainer>
      <div className = "content">
        <h1>Hello World</h1>
        <p>This is my first entry</p>
      </div>
      <div className = "content">
        <h1>Hello World</h1>
      </div>
    </ContentContainer>
  </div>
)
