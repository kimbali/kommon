import LOGO from '../../styles/assets/logo.png';

import React from 'react';

function Logo({ height = 'auto', width = 'auto', className = 'logo' }) {
  return (
    <img
      className={className}
      src={LOGO}
      alt='Body maraton logo'
      height={height}
      width={width}
    />
  );
}

export default Logo;
