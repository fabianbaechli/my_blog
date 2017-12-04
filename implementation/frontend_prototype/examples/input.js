import React from "react"
import { render } from "react-dom"

class InputField extends React.Component {
  constructor(args) {
    super(...args);

    this.changeHandler = this.changeHandler.bind(this);
    this.state = {
      text: ""
    }
  }

  changeHandler(event) {
    console.log(event.target.value)
    this.setState({
      text: event.target.value
    })
  }

  render() {
    return (
      <div>
        <input onChange={this.changeHandler} type="text" value={this.state.text}></input>
        <p>input: {this.state.text}</p>
      </div>
    )
  }
}
render(<InputField/>, document.getElementById("app"));
