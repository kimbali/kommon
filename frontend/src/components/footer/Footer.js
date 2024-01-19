import React from 'react';
import Text from '../text/Text';
import { Link } from 'react-router-dom';
import frontRoutes from '../../config/frontRoutes';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer>
      <Text className='copyright'>{t('copyrightReserved')}</Text>

      <div className='footer-links'>
        <Link to={frontRoutes.terms}>{t('termsAndConditions')}</Link>

        <span>|</span>

        <Link to={frontRoutes.privacyPolicy}>{t('privacyPolicy')}</Link>

        <span>|</span>

        <Link to={frontRoutes.avisoLegal}>{t('legalAdvise')}</Link>

        <span>|</span>

        <Link to={frontRoutes.cookies}>{t('cookiesPolicy')}</Link>
      </div>
    </footer>
  );
}

export default Footer;
