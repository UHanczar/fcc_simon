// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  handleClick(color: string) {
    this.props.onHandleClick(color);
  }
  render() {
    const { color } = this.props;
    return (
      <button
        className={`button ${color}`}
        onClick={() => this.handleClick(color)}
      />
    );
  }
}

Button.propTypes = {
  onHandleClick: PropTypes.func,
  color: PropTypes.string
};

export default Button;
