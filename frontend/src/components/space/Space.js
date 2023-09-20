import React from 'react';
import PropTypes from 'prop-types';

export const size = {
  EXTRA_SMALL: 'extra-small',
  SMALL: 'small',
  MEDIUM: 'medium',
  BIG: 'big',
};

function Space({
  extraSmall = false,
  small = false,
  medium = false,
  big = false,
}) {
  return (
    <span
      className={`space ${extraSmall ? size.EXTRA_SMALL : ''} ${
        small ? size.SMALL : ''
      } ${medium ? size.MEDIUM : ''} ${big ? size.BIG : ''}`}
    ></span>
  );
}

Space.propTypes = {
  state: PropTypes.oneOf([size.EXTRA_SMALL, size.SMALL, size.MEDIUM, size.BIG]),
};

export default Space;
