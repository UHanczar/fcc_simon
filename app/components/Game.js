import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Plate from './Plate';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: ['green', 'yellow', 'blue', 'red'],
      gameOn: false,
      strictMode: false,
      start: false,
      count: 0,
      turns: []
    };
  }
  render() {
    const { buttons } = this.state;
    return (
      <div>
        Game Component
        <Plate buttons={buttons} />
      </div>
    );
  }
}

export default Game;
