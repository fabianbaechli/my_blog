import React from 'react'

import c from '../model/Constants.js'
import DataSource from '../model/DataSource.js'
import style from "../style/BlogController.scss"

import Header from "./Header.js"

export const AboutController = () => (
  <div className="AboutController">
    <Header
      header_content = "About"
    />
    <a>About</a>
  </div>
)
