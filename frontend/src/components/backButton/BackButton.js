import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Text from '../text/Text';
import { useTranslation } from 'react-i18next';

export const BackButton = () => {
  const { t } = useTranslation();
  let navigate = useNavigate();

  return (
    <div className='back-button'>
      <button onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faChevronLeft} />

        <Text isCTA>{t('goBack')}</Text>
      </button>
    </div>
  );
};
