import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MarathonCard from '../components/marathon/MarathonCard';
import Space from '../components/space/Space';
import Text from '../components/text/Text';
import frontRoutes from '../config/frontRoutes';
import { useUser } from '../context/userContext';
import { useGetMarathonsQuery } from '../slices/marathonApiSlice';
import { useCreateProgressMutation } from '../slices/progressApiSlice';
import { useMarathon } from '../context/marathonContext';
import { useRegisterMutation } from '../slices/usersApiSlices';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { USER_ID } from '../config/constants';

function Payment() {
  const { setMarathonId } = useMarathon();
  const { user, updateUser } = useUser();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const [showEmailLink, setShowEmailLink] = useState(false);
  const [today] = useState(new Date().toISOString());

  const [register] = useRegisterMutation();
  const [createProgress] = useCreateProgressMutation();

  const { data: marathonsData } = useGetMarathonsQuery({
    isActive: true,
    startDate: today,
  });

  const handleCreateUser = async () => {
    try {
      const res = await register({ ...state }).unwrap();

      updateUser(res);

      dispatch(setCredentials({ email: res.email }));

      return res;
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleSelectMarathon = async marathon => {
    try {
      // create user after pay
      const res = await handleCreateUser();

      // guardar el progress Id en el user
      await createProgress({
        marathon: marathon._id,
        user: res?._id,
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
        <Link to={frontRoutes.login}>
          Link que recibiria el usuario en el correo electrónico (login)
        </Link>
      ) : (
        <p>Selecciona la marathon a la que quieres apuntarte</p>
      )}
    </div>
  );
}

export default Payment;
