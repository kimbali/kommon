import React, { useState } from 'react';
import Text from '../text/Text';
import PRESENT from '../../styles/img/success.png';
import Space from '../space/Space';
import Button from '../button/Button';
import { useNavigate } from 'react-router-dom';
import frontRoutes from '../../config/frontRoutes';
import formatDate, {
  calculateDaysDifference,
  formatDateHyphens,
  hasMarathonFinished,
  hasMarathonStarted,
} from '../../utils/formatDate';
import { DATE, MARATHON_ID } from '../../config/constants';
import { useMarathon } from '../../context/marathonContext';

function RegisterFormFour({ userData }) {
  const navigate = useNavigate();
  const { setMarathonId } = useMarathon();

  const [{ startDate, endDate, _id: marathonId }] = useState(
    userData.progresses[userData.progresses.length - 1].marathon
  );

  const hasStarted = hasMarathonStarted(startDate);
  const hasFinished = hasMarathonFinished(endDate);
  const daysDifference = calculateDaysDifference(new Date(), endDate);

  const handleClick = () => {
    setMarathonId(marathonId);

    navigate(
      `${
        frontRoutes.main
      }?${MARATHON_ID}=${marathonId}&${DATE}=${formatDateHyphens(new Date())}`,
      {
        replace: true,
      }
    );
  };

  return (
    <div className='register-success'>
      <Text isTitle>¡Felicidades!</Text>

      <Space small />

      <Text fontSize='18'>Has completado satisfactoriamente el formulario</Text>

      <Space small />

      <img src={PRESENT} alt='success present' />

      <Space big />

      {hasStarted && !hasFinished && (
        <>
          <Text fontSize='18'>
            La Maraton empezó el{' '}
            <span className='bold'> {formatDate(startDate)}</span>
          </Text>

          <Space small />

          <Text fontSize='18'>
            ¡Quedan {daysDifference} días para que termine!
          </Text>
        </>
      )}

      {!hasStarted && !hasFinished && (
        <>
          <Text fontSize='18'>
            La Maraton empieza el{' '}
            <span className='bold'> {formatDate(startDate)}</span>
          </Text>

          <Space medium />

          <Text isPlaceholder>
            Tendras acceso a la plataforma 2 días antes de que empiece la
            marathon
          </Text>

          <Space extraSmall />

          <Text isPlaceholder>
            Podras descargarte la lista de la compra de los menus de la primera
            semana
          </Text>
        </>
      )}

      {hasFinished && (
        <Text>Esta Maraton ya ha finalizado. ¡Apuntate a la siguiente!</Text>
      )}

      <Space big />

      <Button
        disabled={!hasStarted || hasFinished}
        big
        center
        isPrimary
        onClick={handleClick}
      >
        marathon
      </Button>

      <Space medium />
    </div>
  );
}

export default RegisterFormFour;
