import React from 'react';
import Text from '../text/Text';
import { Link } from 'react-router-dom';

function TextedLogo({ redirect = '' }) {
  return (
    <Link to={redirect} className='texted-logo'>
      <Text isTitle>
        <span className='primary'>bodymaraton</span>.com
      </Text>
    </Link>
  );
}

export default TextedLogo;
