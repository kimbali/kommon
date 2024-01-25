import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import COOKIE from '../../styles/assets/cookie.svg';
import Text from '../text/Text';
import Button from '../button/Button';
import { Link } from 'react-router-dom';
import frontRoutes from '../../config/frontRoutes';
import Cookies from 'js-cookie';

function CookiesDisclaimer({ setShowCookies }) {
  const { t } = useTranslation();

  useEffect(() => {
    document.body.style.overflowY = 'hidden';

    return () => {
      document.body.style.overflowY = 'scroll';
    };
  }, []);

  const handleCookie = () => {
    Cookies.set('cookie', true, { expires: 31 });
    setShowCookies(false);
  };

  return (
    <>
      <div className='cookie-wrapper' />

      <div className='cookies'>
        <img src={COOKIE} alt='cookie' />

        <Text className='cookies-text'>
          {t('cookiesText')}{' '}
          <span className='more-info-link'>
            <Link to={frontRoutes.cookies}>{t('moreInfo')}</Link>
          </span>
        </Text>

        <Button onClick={handleCookie} isPrimary>
          {t('accept')}
        </Button>
      </div>
    </>
  );
}

export default CookiesDisclaimer;