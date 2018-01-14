import React from 'react'
import ReactDOM from 'react-dom'
import { debounce } from 'throttle-debounce'

import c from '../model/Constants.js'
import style from "../style/Header.scss"

export default class SubheaderSlider extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <hr style={{width: this.props.hr_width, left: this.props.hr_margin}}/>
    )
  }
}
