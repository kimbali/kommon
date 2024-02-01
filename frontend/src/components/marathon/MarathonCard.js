import React from 'react';
import Text from '../text/Text';
import Space from '../space/Space';
import { formatDateDayMonth } from '../../utils/formatDate';
import Button from '../button/Button';
import IMAGE from '../../styles/img/main-img.png';
import { useTranslation } from 'react-i18next';
import frontRoutes from '../../config/frontRoutes';
import { useNavigate } from 'react-router-dom';

function MarathonCard({ handleSelectMarathon, marathon, isCurrent = false }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const goToProgress = () => {
    navigate(frontRoutes.progress);
  };

  return (
    <div className='marathon-card'>
      <Text isSubtitle>{marathon?.name}</Text>

      <Space extraSmall />

      <div className='image-container'>
        <img src={IMAGE} alt='body marathon fit girl' />
        <div className='mask' />
      </div>

      <div>
        {formatDateDayMonth(marathon?.startDate)} -{' '}
        {formatDateDayMonth(marathon?.endDate)}
      </div>

      <Space extraSmall />

      {isCurrent ? (
        <Button small onClick={goToProgress} isPrimary>
          {t('goToProgress')}
        </Button>
      ) : (
        <Button small onClick={() => handleSelectMarathon(marathon)} isPrimary>
          {t('signUp')}
        </Button>
      )}
    </div>
  );
}

export default MarathonCard;
