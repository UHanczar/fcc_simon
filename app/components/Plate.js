import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

const Plate = (props) => {
  const { buttons } = props;

  return (
    <div>
      {buttons.map((square, i) => <Button key={buttons[i]} color={buttons[i]} />)}
    </div>
  );
};

export default Plate;
