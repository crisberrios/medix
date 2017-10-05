import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';
import {CounterIncrementQuery, CounterDecrementQuery, CounterDecrementResponse, CounterQuery } from './counter/counter.js'
// export class MediatorConnect extends Component {
//   render() {
//     return React.Children.only(this.props.children, mediator={this.context.mediator} />
//   }
// }

class App extends Component {
  constructor() {
    super()
    this.state = {
      counter: 0
    }
  }
  incrementCounter() {
    const counterResponse = this.context.mediator.send(new CounterIncrementQuery())
    this.setState({
      counter: counterResponse.counter
    })
  }

  decrementCounter() {
    const counterResponse = this.context.mediator.send(new CounterDecrementQuery())
    this.setState({
      counter: counterResponse.counter
    })
  }

  decrementCounterCommandResponse() {
    const counterResponse = this.context.mediator.send(new CounterQuery(), CounterDecrementResponse)
    this.setState({
      counter: counterResponse.counter
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <button onClick={() => this.incrementCounter()}>Increment Counter</button>
          <button onClick={() => this.decrementCounter()}>Decrement Counter</button>
          <button onClick={() => this.decrementCounterCommandResponse()}>Decrement Counter using command/response overload</button>
          <span>Count: {this.state.counter}</span>
        </p>
      </div>
    );
  }
}

App.contextTypes = {
  mediator: PropTypes.func
}

export default App;
