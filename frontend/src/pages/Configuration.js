import React from 'react';
import Text from '../components/text/Text';
import Space from '../components/space/Space';
import RegionsList from '../components/config/RegionsList';
import { useTranslation } from 'react-i18next';
import DietsList from '../components/config/DietsList';
import ActiveSections from '../components/config/ActiveSections';
import LandingConfig from '../components/config/LandingConfig';

function Configuration() {
  const { t } = useTranslation();

  return (
    <div>
      <Text isTitle>{t('config')}</Text>

      <Space big />

      <div className='config-section'>
        <RegionsList />
      </div>

      <Space big />

      <div className='config-section'>
        <DietsList />
      </div>

      <Space big />

      <div className='config-section'>
        <ActiveSections />
      </div>

      <Space big />

      <div className='config-section'>
        <LandingConfig />
      </div>

      <Space big />
    </div>
  );
}

export default Configuration;
