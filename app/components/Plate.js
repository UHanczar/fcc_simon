// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from './Button';
import Controls from './Controls';

const Plate = (props: Object) => {
  const { buttons, gameOn, strictMode, onHandleClick, switchGame, startGame, turnStrictMode } = props;

  return (
    <div className='plate'>
      <Controls
        gameOn={gameOn}
        strictMode={strictMode}
        switchGame={switchGame}
        startGame={startGame}
        turnStrictMode={turnStrictMode}
      />
      {buttons
        .map((square, i) =>
          <Button
            key={buttons[i]}
            color={buttons[i]}
            onHandleClick={onHandleClick}
          />
          )}
    </div>
  );
};

Plate.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.string),
  gameOn: PropTypes.bool,
  strictMode: PropTypes.bool,
  onHandleClick: PropTypes.func,
  switchGame: PropTypes.func,
  startGame: PropTypes.func,
  turnStrictMode: PropTypes.func
};

export default Plate;
