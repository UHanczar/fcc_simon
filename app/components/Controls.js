// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Controls extends Component {
  render() {
    const { gameOn, strictMode, switchGame, startGame, turnStrictMode } = this.props;
    return (
      <div className='controls'>
        <h2>Simon<span>&#174;</span></h2>
        <div className='indicators'>
          <div className='count-group'>
            <div className='count'><span className='count-data' style={gameOn === false ? { color: 'rgb(89, 3, 26)' } : { color: 'red' } }>--</span></div>
            <span>count</span>
          </div>
          <div className='start-group'>
            <button className='start' onClick={() => startGame()}></button>
            <span>start</span>
          </div>
          <div className='strictmode-group'>
            <div className='strictmode-indicator' style={strictMode ? { backgroundColor: 'red' } : { backgroundColor: 'black' } }></div>
            <button className='strictmode' onClick={() => turnStrictMode()}></button>
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

Controls.propTypes = {
  gameOn: PropTypes.bool,
  strictMode: PropTypes.bool,
  switchGame: PropTypes.func,
  startGame: PropTypes.func,
  turnStrictMode: PropTypes.func
};

export default Controls;
