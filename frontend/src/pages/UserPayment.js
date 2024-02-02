import React from 'react';
import Text from '../components/text/Text';
import Space from '../components/space/Space';
import { useMarathon } from '../context/marathonContext';
import MarathonCard from '../components/marathon/MarathonCard';

function UserPayment() {
  const { marathon, updateMarathon } = useMarathon();

  const handleSelectMarathon = marathon => {
    updateMarathon(marathon);
  };

  return (
    <div>
      <Text isTitle>Página de pago como usuario registrado</Text>
      <Space medium />

      <Text isSubtitle>Falta diseño</Text>

      <Space small />

      <Text>
        Página de pago como usuario que ya he realizado mas maratones.
      </Text>

      <Text>Poner el precio etc...</Text>

      <Space medium />

      <div className='user-marathons'>
        <MarathonCard
          marathon={marathon}
          handleSelectMarathon={handleSelectMarathon}
        />
      </div>
    </div>
  );
}

export default UserPayment;
