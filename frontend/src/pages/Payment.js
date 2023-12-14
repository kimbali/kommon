import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation } from 'react-router-dom';
import MarathonCard from '../components/marathon/MarathonCard';
import Space from '../components/space/Space';
import Text from '../components/text/Text';
import frontRoutes from '../config/frontRoutes';
import { useUser } from '../context/userContext';
import { useGetMarathonsQuery } from '../slices/marathonApiSlice';
import { useCreateProgressMutation } from '../slices/progressApiSlice';
import { useMarathon } from '../context/marathonContext';
import {
  useProfileMutation,
  useRegisterMutation,
} from '../slices/usersApiSlices';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { useGetEmailQuery } from '../slices/emailApiSlice';

function Payment() {
  const { setMarathonId } = useMarathon();
  const { updateUser } = useUser();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const [showEmailLink, setShowEmailLink] = useState(false);
  const [today] = useState(new Date().toISOString());

  const [register] = useRegisterMutation();
  const [createProgress] = useCreateProgressMutation();
  const [updateProfile] = useProfileMutation();

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

  // const { data: emailData } = useGetEmailQuery();

  const handleSelectMarathon = async marathon => {
    try {
      // TODO: create user after pay
      const res = await handleCreateUser();

      const newProgress = await createProgress({
        marathon: marathon._id,
        user: res?._id,
      });

      const progresses = res.progresses.concat(newProgress.data._id);
      await updateProfile({ progresses });

      setMarathonId(marathon._id);

      await setShowEmailLink(true);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      <Space big />

      <Text isTitle>Página de pago</Text>

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

      <Space medium />

      <Text>
        Aqui se abriria la applicación del banco y mandariamos un email para
        confirmar el correo electrónico.
      </Text>
    </div>
  );
}

export default Payment;
