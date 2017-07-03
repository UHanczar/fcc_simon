// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from './Button';
import Controls from './Controls';

const Plate = (props: Object) => {
  const { buttons, gameOn, strictMode, count, onHandleClick, switchGame, startGame, turnStrictMode, currentButton } = props;

  return (
    <div className='plate'>
      <Controls
        gameOn={gameOn}
        strictMode={strictMode}
        count={count}
        switchGame={switchGame}
        startGame={startGame}
        turnStrictMode={turnStrictMode}
      />
      {buttons
        .map((square, i) =>
          <Button
            key={buttons[i]}
            color={buttons[i]}
            currentButton={currentButton}
            onHandleClick={onHandleClick}
          />
          )}
    </div>
  );
};

Plate.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.string),
  gameOn: PropTypes.bool,
  count: PropTypes.number,
  strictMode: PropTypes.bool,
  onHandleClick: PropTypes.func,
  switchGame: PropTypes.func,
  startGame: PropTypes.func,
  turnStrictMode: PropTypes.func
};

export default Plate;
