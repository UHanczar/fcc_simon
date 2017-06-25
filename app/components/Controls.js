// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Controls extends Component {
  render() {
    const { gameOn, switchGame } = this.props;
    return (
      <div className='controls'>
        <h2>Simon<span>&#174;</span></h2>
        <div className='indicators'>
          <div className='count-group'>
            <div className='count'></div>
            <span>count</span>
          </div>
          <div className='start-group'>
            <button className='start'></button>
            <span>start</span>
          </div>
          <div className='strictmode-group'>
            <div className='strictmode-indicator'></div>
            <button className='strictmode'></button>
            <span>strict</span>
          </div>
        </div>
        <div className='turn-on-game' onClick={() => switchGame()}>
          <span>off</span>
          <div className='switch-game'>
            <div className={gameOn ? 'turn-off' : 'turn-on'}></div>
            <div className={gameOn ? 'turn-on' : 'turn-off'}></div>
          </div>
          <span>on</span>
        </div>
      </div>
    );
  }
}

export default Controls;
