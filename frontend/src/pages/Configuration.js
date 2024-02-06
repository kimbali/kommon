import React from 'react';
import Text from '../components/text/Text';
import Space from '../components/space/Space';
import RegionsList from '../components/config/RegionsList';
import { useTranslation } from 'react-i18next';
import DietsList from '../components/config/DietsList';
import ActiveSections from '../components/config/ActiveSections';
import { useGetConfigsQuery } from '../slices/configApiSlice';

function Configuration() {
  const { t } = useTranslation();

  const { data: configData } = useGetConfigsQuery({});

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

      {configData && (
        <div className='config-section'>
          <ActiveSections config={configData[0]} />
        </div>
      )}
    </div>
  );
}

export default Configuration;
