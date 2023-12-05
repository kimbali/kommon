import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import MarathonCard from '../components/marathon/MarathonCard';
import Space from '../components/space/Space';
import Text from '../components/text/Text';
import frontRoutes from '../config/frontRoutes';
import { useUser } from '../context/userContext';
import { useGetMarathonsQuery } from '../slices/marathonApiSlice';
import { useCreateProgressMutation } from '../slices/progressApiSlice';
import { useMarathon } from '../context/marathonContext';

function Payment() {
  const { setMarathonId } = useMarathon();
  const { user } = useUser();

  const [showEmailLink, setShowEmailLink] = useState(false);

  // asignar marathon mas cercana

  const { data: marathonsData } = useGetMarathonsQuery({ isActive: true });
  const [createProgress] = useCreateProgressMutation();

  const handleSelectMarathon = async marathon => {
    try {
      await createProgress({
        marathon: marathon._id,
        user: user?._id,
      });
      setMarathonId(marathon._id);
      setShowEmailLink(true);
    } catch (err) {
      toast.error('Error creating the progress');
    }
  };

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

      <div className='user-marathons'>
        {marathonsData?.marathons.length > 0 &&
          marathonsData?.marathons.map((ele, i) => (
            <MarathonCard
              marathon={ele}
              handleSelectMarathon={handleSelectMarathon}
              key={`marathon-card-${i}`}
            />
          ))}
      </div>

      <Space medium />

      {showEmailLink ? (
        <Link to={frontRoutes.register}>
          Link que recibiria el usuario en el correo electrónico
        </Link>
      ) : (
        <p>Selecciona la marathon a la que quieres apuntarte</p>
      )}
    </div>
  );
}

export default Payment;
