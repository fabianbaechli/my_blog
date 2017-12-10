import React from "react"
import { render } from "react-dom"

class ShuffleButton extends React.Component {
  constructor(args) {
    super(...args);
    this.clickHandler = this.clickHandler.bind(this);

    this.state = {
      value: undefined
    };
  }

  clickHandler() {
    const random = Math.floor((Math.random() * 6) + 1);
    this.setState({
      value: random
    });
    console.log(this.state.value)
  }

  render() {
    return (
      <div>
        <button onClick={this.clickHandler}>Shuffle!</button>
        <ShuffleValueDisplay value={this.state.value}/>
      </div>
    )
  }
}

class ShuffleValueDisplay extends React.Component {
  constructor(args) {
    super(...args);
  }

  render() {
    console.log(this.props)
    return (
      <p>Your shuffeled value: {this.props.value}!</p>
    )
  }
}

render(<ShuffleButton/>, document.getElementById("app"));
