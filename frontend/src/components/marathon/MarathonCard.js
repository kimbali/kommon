import React from 'react';
import Text from '../text/Text';
import Space from '../space/Space';
import { formatDateDayMonth } from '../../utils/formatDate';
import Button from '../button/Button';
import IMAGE from '../../styles/img/main-img.png';
import { useTranslation } from 'react-i18next';

function MarathonCard({ handleSelectMarathon, marathon }) {
  const { t } = useTranslation();

  return (
    <div className='marathon-card'>
      <Text isSubtitle>{marathon.name}</Text>

      <Space extraSmall />

      <div className='image-container'>
        <img src={IMAGE} alt='body marathon fit girl' />
        <div className='mask' />
      </div>

      <div>
        {formatDateDayMonth(marathon.startDate)} -{' '}
        {formatDateDayMonth(marathon.endDate)}
      </div>

      <Space extraSmall />

      <Button small onClick={() => handleSelectMarathon(marathon)} isPrimary>
        Inscribirme
      </Button>
    </div>
  );
}

export default MarathonCard;
