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

function RegisterFormFour({ userData }) {
  const navigate = useNavigate();

  const [{ startDate, endDate }] = useState(
    userData.progresses[userData.progresses.length - 1].marathon
  );

  const hasStarted = hasMarathonStarted(startDate);
  const hasFinished = hasMarathonFinished(endDate);
  const daysDifference = calculateDaysDifference(new Date(), endDate);

  const handleClick = () => {
    navigate(frontRoutes.main);
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
