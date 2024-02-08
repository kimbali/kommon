import React, { useEffect, useState } from 'react';
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
import {
  useProfileMutation,
  useRegisterMutation,
} from '../slices/usersApiSlices';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { useSendEmailMutation } from '../slices/emailApiSlice';
import { useTranslation } from 'react-i18next';

function Payment() {
  const { t } = useTranslation();
  const { setMarathonId } = useMarathon();
  const { updateUser } = useUser();

  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showEmailLink, setShowEmailLink] = useState(false);
  const [today] = useState(new Date().toISOString());

  const [register] = useRegisterMutation();
  const [createProgress] = useCreateProgressMutation();
  const [updateProfile] = useProfileMutation();
  const [sendEmail] = useSendEmailMutation();

  const { data: marathonsData } = useGetMarathonsQuery({
    isActive: true,
    startDate: today,
  });

  useEffect(() => {
    if (!state) {
      navigate(frontRoutes.register);
    }
  }, [state]);

  const handleCreateUser = async () => {
    try {
      const res = await register({ ...state }).unwrap();

      updateUser(res);

      dispatch(setCredentials({ email: res.email }));

      return res;
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleSelectMarathon = async marathon => {
    try {
      const res = state.createdByAdmin
        ? { ...state }
        : await handleCreateUser();

      if (!res) {
        return;
      }
      // TODO: Mirar si el usuario ya ha pagado, porque se ha creado desde Backoffice.
      const newProgress = await createProgress({
        marathon: marathon._id,
        user: res?._id,
        isPaid: true,
      });

      const progresses = res.progresses.concat(newProgress.data._id);

      await updateProfile({ ...state, progresses, hasPaid: true });

      setMarathonId(marathon._id);

      await setShowEmailLink(true);

      await sendEmail({ email: state.email || 'kimgarcianton@hotmail.com' });
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className='page-wrapper'>
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
