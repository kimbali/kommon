import React from 'react';
import Text from '../text/Text';
import { Link } from 'react-router-dom';
import frontRoutes from '../../config/frontRoutes';

function Footer() {
  return (
    <footer>
      <Text className='copyright'>
        @ copyright maraton.com 2022. All rights reserved
      </Text>

      <div className='footer-links'>
        <Link to={frontRoutes.privacyPolicy}>Privacy policy</Link>

        <Text> and </Text>

        <Link to={frontRoutes.terms}>User agreement</Link>

        <Text>, agreement to use </Text>

        <Link to={frontRoutes.cookies}>cookies files</Link>
      </div>
    </footer>
  );
}

export default Footer;
