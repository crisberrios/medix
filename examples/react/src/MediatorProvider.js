import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class MediatorProvider extends Component {
  getChildContext() {
    return { mediator: this.props.mediator }
  }
  render() {
    return React.Children.only(this.props.children)
  }
}

MediatorProvider.childContextTypes = {
  mediator: PropTypes.func
}
