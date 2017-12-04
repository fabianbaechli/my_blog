import React from "react"
import { render } from "react-dom"

class CounterView extends React.Component {
  constructor(args) {
    super(...args);

    this.state = {
      updateCount: 0
    }
  }

  render() {
    return (
      <div>
        You clicked {this.props.count} times!
        <button onClick={this.props.viewclickhandler}>Send data to parent</button>
      </div>
    )
  }
}

class CounterComponent extends React.Component {
  constructor(args) {
    super(...args);

    this.clickHandler = this.clickHandler.bind(this);
    this.viewClickHandler = this.viewClickHandler.bind(this);

    this.state = {
      counter: 0
    };
  }

  clickHandler() {
    this.setState({
      counter: this.state.counter + 1
    });
  }

  viewClickHandler() {
    console.log("clicked inside child component")
  }

  render() {
    return (
      <div>
        <CounterView count={this.state.counter} viewclickhandler={this.viewClickHandler}/>
        <button onClick={this.clickHandler}>Click me!</button>
      </div>
    );
  }
}

render(<CounterComponent/>, document.getElementById("app"));
