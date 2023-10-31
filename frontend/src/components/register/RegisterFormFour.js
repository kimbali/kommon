import React from 'react';
import Text from '../text/Text';
import PRESENT from '../../styles/img/success.png';
import Space from '../space/Space';
import Button from '../button/Button';
import { useNavigate } from 'react-router-dom';
import frontRoutes from '../../config/frontRoutes';

function RegisterFormFour() {
  const navigate = useNavigate();

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

      <Space small />

      <Text fontSize='18'>Has completado satisfactoriamente el formulario</Text>

      <Space big />

      <Button big center isPrimary onClick={handleClick}>
        marathon
      </Button>
    </div>
  );
}

export default RegisterFormFour;
