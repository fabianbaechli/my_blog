import React from 'react'

import c from '../model/Constants.js'
import DataSource from '../model/DataSource.js'
import style from "../style/MainViewController.scss"

import Header from "./Header.js"

export default class MainViewController extends React.Component {
  constructor(props) {
    super(props)

  }
  render() {
    return (
      <div className="MainViewController">
        <Header
          header_content="Fabian Bächli - My Blog"
        />
      </div>
    )
  }
}