import React from 'react';
import Text from '../components/text/Text';
import Space from '../components/space/Space';
import RegionsList from '../components/config/RegionsList';
import { useTranslation } from 'react-i18next';

function Configuration() {
  const { t } = useTranslation();

  return (
    <div>
      <Text isTitle>{t('config')}</Text>

      <Space big />

      <RegionsList />
    </div>
  );
}

export default Configuration;
