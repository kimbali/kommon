import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import frontRoutes from '../../config/frontRoutes';
import LogoutButton from '../button/LogoutButton';
import { useUser } from '../../context/userContext';
import Button from '../button/Button';
import { useTranslation } from 'react-i18next';

function MenuLinks() {
  const { t } = useTranslation();
  const { user } = useUser();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate(frontRoutes.login);
  };

  return (
    <ul className='user-menu-links'>
      <li>
        <Link to={frontRoutes.profile}>{t('profile')}</Link>
      </li>
      <li>
        <Link to={frontRoutes.profileMarathons}>{t('yourMarathons')}</Link>
      </li>
      {!user ? (
        <li>
          <Button small isPrimary onClick={handleLogin}>
            {t('login')}
          </Button>
        </li>
      ) : (
        <li>
          <LogoutButton />
        </li>
      )}
    </ul>
  );
}

export default MenuLinks;
