// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Controls extends Component {
  render() {
    const { gameOn, start, strictMode, count, switchGame, startGame, turnStrictMode, error, winner } = this.props;

    const renderCount = (counter, err, win) => {
      let res;
      if (err === true) {
        res = '!!';
      } else if (win === true) {
        res = '$$';
      } else if (counter === 0) {
        res = '--';
      } else if (counter > 0) {
        res = counter;
      }
      return res;
    }
    // count > 0 ? count : '--'
    return (
      <div className='controls'>
        <h2>Simon<span>&#174;</span></h2>
        <div className='indicators'>
          <div className='count-group'>
            <div className='count'><span className={`count-data ${winner ? 'count-winner' : ''} ${error ? 'warning' : ''}`} style={Object.assign({}, gameOn === false ? { color: 'rgb(89, 3, 26)' } : { color: 'red' }, count ? { fontWeight: 'bold' } : { fontWeight: 'normal' })}>{ renderCount(count, error, winner) }</span></div>
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
  count: PropTypes.number,
  switchGame: PropTypes.func,
  startGame: PropTypes.func,
  turnStrictMode: PropTypes.func
};

export default Controls;
