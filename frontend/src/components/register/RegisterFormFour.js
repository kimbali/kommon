import React, { useState } from 'react';
import Text from '../text/Text';
import PRESENT from '../../styles/img/success.png';
import Space from '../space/Space';
import Button from '../button/Button';
import { useNavigate } from 'react-router-dom';
import frontRoutes from '../../config/frontRoutes';
import formatDate, {
  calculateDaysDifference,
  hasMarathonFinished,
  hasMarathonStarted,
} from '../../utils/formatDate';
import { MARATHON_ID } from '../../config/constants';
import { useTranslation } from 'react-i18next';

function RegisterFormFour({ userData }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [{ startDate, endDate, _id: marathonId }] = useState(
    userData?.progresses[userData?.progresses.length - 1]?.marathon
  );

  const hasStarted = hasMarathonStarted(startDate);
  const hasFinished = hasMarathonFinished(endDate);
  const daysDifference = calculateDaysDifference(new Date(), endDate);

  const handleClick = () => {
    navigate(`${frontRoutes.main}?${MARATHON_ID}=${marathonId}`, {
      replace: true,
    });
  };

  return (
    <div className='register-success'>
      <Text isTitle>{t('congrats')}</Text>

      <Space small />

      <Text fontSize='18'>{t('hasComplete')}</Text>

      <Space small />

      <img src={PRESENT} alt='success present' />

      <Space big />

      {hasStarted && !hasFinished && (
        <>
          <Text fontSize='18'>
            {t('marathonHasStarted')}{' '}
            <span className='bold'> {formatDate(startDate)}</span>
          </Text>

          <Space small />

          <Text fontSize='18'>
            {t('remains')} {daysDifference} {t('daysForEnd')}
          </Text>
        </>
      )}

      {!hasStarted && !hasFinished && (
        <>
          <Text fontSize='18'>
            {t('marathonStarts')}{' '}
            <span className='bold'> {formatDate(startDate)}</span>
          </Text>

          <Space medium />

          <Text isPlaceholder>{t('accessTwoDaysBefore')}</Text>

          <Space extraSmall />

          <Text isPlaceholder>{t('downloadShoppingList')}</Text>
        </>
      )}

      {hasFinished && <Text>{t('marathonHasFinished')}</Text>}

      <Space big />

      <Button
        // disabled={!hasStarted || hasFinished}
        big
        center
        isPrimary
        onClick={handleClick}
      >
        {t('marathon')}
      </Button>

      <Space medium />
    </div>
  );
}

export default RegisterFormFour;
