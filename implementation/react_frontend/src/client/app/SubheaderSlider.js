import React from 'react'
import ReactDOM from 'react-dom'
import { debounce } from 'throttle-debounce'

import c from '../model/Constants.js'
import style from "../style/Header.scss"
let width, margin

export default class SubheaderSlider extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidUpdate() {
    width = this.props.hr_width
    margin = this.props.hr_margin
  }
  render() {
    return (
      <hr style={{width: this.props.hr_width, left: this.props.hr_margin}}/>
    )
  }
}
