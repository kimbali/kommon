import React from 'react';
import { Link } from 'react-router-dom';
import Space from '../components/space/Space';
import frontRoutes from '../config/frontRoutes';
import Text from '../components/text/Text';

function Payment() {
  return (
    <div>
      <Space big />

      <Text isTitle>Página de pago</Text>

      <Space medium />

      <Text>
        Aqui se abriria la applicación del banco y mandariamos un email para
        confirmar el correo electrónico.
      </Text>

      <Space medium />

      <Link to={frontRoutes.register}>
        Link que recibiria el usuario en el correo electrónico
      </Link>
    </div>
  );
}

export default Payment;
