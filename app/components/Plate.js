// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from './Button';
import Controls from './Controls';

const Plate = (props: string | Array<string> | Function) => {
  const { buttons, onHandleClick, switchGame, gameOn } = props;

  return (
    <div className='plate'>
      <Controls gameOn={gameOn} switchGame={switchGame} />
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

export default Plate;
