import React from 'react'

import c from '../model/Constants.js'
import DataSource from '../model/DataSource.js'
import style from "../style/BlogController.scss"

import Header from "./Header.js"

export default class AboutController extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="AboutController">
        <Header
          header_content = "About"
          hr_width = {70.81}
          hr_margin = {-23}
        />
        <a>About</a>
      </div>
    )
  }
}
