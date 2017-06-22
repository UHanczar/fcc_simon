import React, { Component } from 'react';

import Game from './Game';

class Container extends Component {
  render() {
    return (
      <div>
        <h1>Free Code Camp</h1>
        <Game />
      </div>
    );
  }
}

export default Container;
