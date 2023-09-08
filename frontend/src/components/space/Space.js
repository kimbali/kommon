import React from 'react';
import PropTypes from 'prop-types';

export const size = {
  EXTRA_SMALL: 'extra-small',
  SMALL: 'small',
  MEDIUM: 'medium',
  BIG: 'big',
};

function Space({ size = '' }) {
  return <span className={`space ${size}`}></span>;
}

Space.propTypes = {
  state: PropTypes.oneOf([size.EXTRA_SMALL, size.SMALL, size.MEDIUM, size.BIG]),
};

export default Space;
