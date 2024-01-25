import React from 'react';
import NavLink from '../components/navBar/NavLink';
import { faSpa } from '@fortawesome/free-solid-svg-icons';
import frontRoutes from '../config/frontRoutes';
import { useTranslation } from 'react-i18next';
import Text from '../components/text/Text';

function UserMore() {
  const { t } = useTranslation();

  return (
    <div>
      <Text isTitle>{t('services')}</Text>
      <nav>
        <ul className='more-links'>
          <NavLink
            icon={faSpa}
            label={t('meditations')}
            route={frontRoutes.meditations}
          />
        </ul>
      </nav>
    </div>
  );
}

export default UserMore;
