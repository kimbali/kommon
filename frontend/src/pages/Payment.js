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
  useCheckoutMutation,
  useRegisterMutation,
} from '../slices/usersApiSlices';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { useTranslation } from 'react-i18next';
import template from '../components/emails/template';
import postEmail from '../utils/postEmail';
import { useBuyOneGiftMutation } from '../slices/giftsApiSlice';

function Payment() {
  const { t } = useTranslation();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const { updateMarathon } = useMarathon();
  const { updateUser } = useUser();

  const [showEmailLink, setShowEmailLink] = useState(false);
  const [userData] = useState(state);
  const [today] = useState(new Date().toISOString());

  const [register] = useRegisterMutation();
  const [createProgress] = useCreateProgressMutation();
  const [updateCheckout] = useCheckoutMutation();
  const [buyOneGift] = useBuyOneGiftMutation();

  const { data: marathonsData } = useGetMarathonsQuery({
    isActive: true,
    startDate: today,
  });

  // useEffect(() => {
  //   if (!state) {
  //     navigate(frontRoutes.register);
  //   }
  // }, []);

  const handleCreateUser = async () => {
    try {
      const res = await register({ ...userData }).unwrap();

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
      const res = userData.createdByAdmin
        ? { ...userData }
        : await handleCreateUser();

      if (!res) {
        return;
      }

      // TODO: Mirar si el usuario ya ha pagado, porque se ha creado desde Backoffice.
      const newProgress = await createProgress({
        marathon: marathon._id,
        user: res?._id,
        isPaid: true,
        gift: userData?.giftSelected,
      });

      await buyOneGift(userData.giftSelected);

      const progresses = res.progresses.concat(newProgress.data._id);

      await updateCheckout({
        ...userData,
        userId: res?._id,
        progresses,
        hasPaid: true,
      });

      updateMarathon(marathon);

      await setShowEmailLink(true);

      const templateHTML = await template();

      // from: 'Body Maraton TEST <onboarding@resend.dev>',
      await postEmail({
        from: 'Body Maraton <noreply@bodymaraton.com>',
        to: userData.email.trim(),
        subject: 'Te has registrado en Bodymaraton',
        html: templateHTML,
      });
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className='page-wrapper'>
      <Space big />

      <Text center isTitle>
        Página de pago
      </Text>

      <Space small />

      {marathonsData?.marathons.length > 0 && (
        <Text center isSectionTitle>
          ¿A qué maratón quieres inscribierte?
        </Text>
      )}

      <Space big />

      {!showEmailLink && (
        <div className='user-marathons'>
          {marathonsData?.marathons.length > 0 ? (
            marathonsData?.marathons.map((ele, i) => (
              <MarathonCard
                marathon={ele}
                handleSelectMarathon={handleSelectMarathon}
                key={`marathon-card-${i}`}
              />
            ))
          ) : (
            <Text color='primary'>No hay próximas maratones</Text>
          )}
        </div>
      )}

      <Space medium />

      {marathonsData?.marathons.length > 0 && showEmailLink && (
        <Link to={frontRoutes.login}>
          <Text center color='primary'>
            LOGIN LINK - RECIBIDO EN @MAIL
          </Text>
        </Link>
      )}

      <Space big />

      <Text color='disabled' fontSize='14' center>
        Aqui se abriria la applicación del banco y mandariamos un email para
        confirmar el correo electrónico.
      </Text>

      <Space big />
    </div>
  );
}

export default Payment;
