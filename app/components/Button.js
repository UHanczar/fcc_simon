// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  handleClick(color: string) {
    this.props.onHandleClick(color);
  }
  render() {
    const { color, currentButton } = this.props;
    const activeColor = (button) => {
      switch (button) {
        case 'blue':
          return { backgroundColor: '#1c8cff' };
          //return setTimeout(() => { backgroundColor: '#1c8cff' }, 900);
        case 'green':
          //return setTimeout(() => { backgroundColor: '#13ff7c' }, 900);
          return { backgroundColor: '#13ff7c' };
        case 'red':
          //return setTimeout(() => { backgroundColor: '#ff4c4c' }, 900);
          return { backgroundColor: '#ff4c4c' };
        case 'yellow':
          //return setTimeout(() => { backgroundColor: '#fed93f' }, 900);
          return { backgroundColor: '#fed93f' };
      }
    }
    return (
      <button
        className={`button ${color}`}
        style={currentButton === color ? activeColor(currentButton) : {}}
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
