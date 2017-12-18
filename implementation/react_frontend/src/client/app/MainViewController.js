import React from 'react'

import c from '../model/Constants.js'
import DataSource from '../model/DataSource.js'
import style from "../style/MainViewController.scss"

import Header from "./Header.js"
import MainBody from "./MainBody.js"

export const MainViewController = () => (
  <div className="MainViewController">
    <Header
      header_content = "Fabian Bächli - My Blog"
    />
    <MainBody />
  </div>
)
