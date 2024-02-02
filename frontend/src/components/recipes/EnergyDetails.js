import React from 'react';
import Text from '../text/Text';
import { useTranslation } from 'react-i18next';
import calculateEnergy from '../../utils/calculateEnergy';
import { useUser } from '../../context/userContext';

function EnergyDetails({ ingredients, fullWidth = false }) {
  const { t } = useTranslation();
  const { user } = useUser();

  return (
    <div className={`energy-details ${fullWidth ? 'full-width' : ''}`}>
      <div className='propiedad'>
        <Text isSubtitle>{t('kcal')}: </Text>
        <Text>{calculateEnergy('calories', ingredients, user)}</Text>
      </div>

      <div className='propiedad'>
        <Text isSubtitle>{t('prot')}: </Text>
        <Text>{calculateEnergy('proteins', ingredients, user)}</Text>
      </div>

      <div className='propiedad'>
        <Text isSubtitle>{t('fat')}: </Text>
        <Text>{calculateEnergy('fats', ingredients, user)}</Text>
      </div>

      <div className='propiedad'>
        <Text isSubtitle>{t('carbh')}: </Text>
        <Text>{calculateEnergy('carbohydrates', ingredients, user)}</Text>
      </div>
    </div>
  );
}

export default EnergyDetails;
