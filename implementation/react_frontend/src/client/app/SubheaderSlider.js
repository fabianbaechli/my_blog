import React from 'react'
import ReactDOM from 'react-dom'
import { debounce } from 'throttle-debounce'
import { findDOMNode } from 'react-dom'

import c from '../model/Constants.js'
import style from "../style/Header.scss"
let width, margin
let mountCounter = 0

export default class SubheaderSlider extends React.Component {
  constructor(props) {
    super(props)
    this.setMargin = debounce(50, this.setMargin)
  }

  setMargin() {
    if (findDOMNode(this.props.subheader) !== null) {
      width = findDOMNode(this.props.subheader).offsetWidth
      margin = findDOMNode(this.props.subheader).getBoundingClientRect().left
      this.forceUpdate()
    }
  }

  componentDidMount() {
    // the setMargin function has to be called after some time for the first time,
    // since the getBoundingClientRect().left property of the active subheader
    // returns a wrong value after only 50ms from the debounces' wait time
    if (mountCounter++ === 0) {
      setTimeout(() => {
        this.setMargin()
      }, 500);
    } else {
      this.setMargin()
    }
    window.addEventListener("resize", this.setMargin.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setMargin.bind(this))
  }

  render() {
    return (
      <hr className="subheader_slider" style={{width: width, left: margin}}/>
    )
  }
}
