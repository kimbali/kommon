import React, { useState } from 'react';
import NavLink from '../components/navBar/NavLink';
import { faPaperPlane, faSpa } from '@fortawesome/free-solid-svg-icons';
import frontRoutes from '../config/frontRoutes';
import { useTranslation } from 'react-i18next';
import Text from '../components/text/Text';
import { useConfig } from '../context/configContext';
import VACUUM from '../styles/assets/vacuum.png';
import KCAL_CALCULATOR from '../styles/assets/kcal_calculator.png';
import WATER_TRACKER from '../styles/assets/water_tracker.png';
import { useGetImageUrlQuery } from '../slices/imagesApiSlice';

function UserMore() {
  const { t } = useTranslation();
  const { config } = useConfig();

  const { data: imageS3 } = useGetImageUrlQuery({
    url: '1708718770970_image_AGUA2.pdf',
  });

  return (
    <div>
      <Text isTitle>{t('services')}</Text>

      <nav>
        <ul className='more-links'>
          <NavLink
            image={KCAL_CALCULATOR}
            label={t('caloriesCalculator')}
            route={frontRoutes.caloriesCalculator}
          />

          <NavLink
            downloadLink={imageS3?.signedUrl}
            image={WATER_TRACKER}
            label={t('waterTracker')}
          />

          <NavLink
            image={VACUUM}
            label={t('vacuum')}
            route={frontRoutes.caloriesCalculator}
          />

          {config?.activeMeditations && (
            <NavLink
              icon={faSpa}
              label={t('meditations')}
              route={frontRoutes.meditations}
            />
          )}

          <NavLink
            icon={faPaperPlane}
            label={t('contactUs')}
            route={frontRoutes.contactUs}
          />
        </ul>
      </nav>
    </div>
  );
}

export default UserMore;
