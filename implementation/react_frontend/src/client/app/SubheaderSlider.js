import React from 'react'
import ReactDOM from 'react-dom'
import { debounce } from 'throttle-debounce'

import c from '../model/Constants.js'
import style from "../style/Header.scss"

let margin

export default class SubheaderSlider extends React.Component {
  constructor(props) {
    super(props)
    this.setMargin = debounce(100, this.setMargin)
  }

  setMargin() {
    margin = document.getElementById(this.props.hr_underline_element).getBoundingClientRect().left
    this.forceUpdate()
  }

  componentDidMount() {
    this.setMargin()
    window.addEventListener("resize", this.setMargin.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setMargin.bind(this))
  }

  render() {
    return (
      <hr style={{width: this.props.hr_width + 'px', marginLeft: margin + 'px'}}/>
    )
  }
}
