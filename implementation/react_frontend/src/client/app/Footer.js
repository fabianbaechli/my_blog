import React from 'react'
import style from '../style/Footer.scss'

export default class Footer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="footer">
        <span>
          This page was created by Fabian Bächli
        </span>
      </div>
    )
  }
}
