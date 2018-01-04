import React from 'react'
import ReactDOM from 'react-dom'
import { debounce } from 'throttle-debounce'

import c from '../model/Constants.js'
import style from "../style/Header.scss"

let margin, width

export default class SubheaderSlider extends React.Component {
  constructor(props) {
    super(props)
  }

  setMargin() {
    margin = document.getElementById(this.props.hr_underline_element).getBoundingClientRect().left
    this.forceUpdate()
  }

  componentDidMount() {
    this.setMargin()
    window.addEventListener("resize", debounce(150, this.setMargin).bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener("resize", debounce(150, this.setMargin).bind(this))
  }

  render() {
    let width = this.props.hr_width
    return (
      <hr style={{width: width + 'px', marginLeft: margin + 'px'}}/>
    )
  }
}
