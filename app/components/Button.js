import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const { color } = props;
  return (
    <div>{color}</div>
  )
};

export default Button;
