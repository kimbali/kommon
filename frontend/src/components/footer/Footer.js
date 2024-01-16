import React from 'react';
import Text from '../text/Text';
import { Link } from 'react-router-dom';
import frontRoutes from '../../config/frontRoutes';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer>
      <Text className='copyright'>
        @ copyright maraton.com 2022. All rights reserved
      </Text>

      <div className='footer-links'>
        <Link to={frontRoutes.terms}>Términos y condiciones</Link>

        <span>|</span>

        <Link to={frontRoutes.privacyPolicy}>Política de privacidad</Link>

        <span>|</span>

        <Link to={frontRoutes.avisoLegal}>Aviso legal</Link>

        <span>|</span>

        <Link to={frontRoutes.cookies}>Política de cookies</Link>
      </div>
    </footer>
  );
}

export default Footer;
