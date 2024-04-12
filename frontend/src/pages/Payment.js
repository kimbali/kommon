import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MarathonCard from '../components/marathon/MarathonCard';
import Space from '../components/space/Space';
import Text from '../components/text/Text';
import frontRoutes from '../config/frontRoutes';
import { useUser } from '../context/userContext';
import {
  useGetMarathonsQuery,
  useUpdateParticipantsMutation,
} from '../slices/marathonApiSlice';
import { useCreateProgressMutation } from '../slices/progressApiSlice';
import { useMarathon } from '../context/marathonContext';
import {
  useCheckoutMutation,
  useRegisterMutation,
} from '../slices/usersApiSlices';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { useTranslation } from 'react-i18next';
import templateRegister from '../components/emails/templateRegister';
import postEmail from '../utils/postEmail';
import { useBuyOneGiftMutation } from '../slices/giftsApiSlice';
import formatDate, { formatDateLong } from '../utils/formatDate';
import TextedLogo from '../components/header/TextedLogo';

function Payment() {
  const { t } = useTranslation();
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { updateMarathon, marathon } = useMarathon();
  const { updateUser } = useUser();

  const [showEmailLink, setShowEmailLink] = useState(false);
  const [userData] = useState(state);
  const [today] = useState(new Date().toISOString());

  const [register] = useRegisterMutation();
  const [createProgress] = useCreateProgressMutation();
  const [updateCheckout] = useCheckoutMutation();
  const [buyOneGift] = useBuyOneGiftMutation();
  const [updateParticipants] = useUpdateParticipantsMutation();

  const { data: marathonsData } = useGetMarathonsQuery({
    isActive: true,
    startDate: today,
  });

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

      await updateParticipants(marathon._id);

      updateMarathon(marathon);

      await setShowEmailLink(true);

      const templateHTML = await templateRegister();

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

  if (!userData) {
    navigate(frontRoutes.home);
  }

  return (
    <div className='page-wrapper payment'>
      <Space medium />

      <header>
        <TextedLogo redirect={frontRoutes.home} />
      </header>

      <Space medium />

      <div className='content-wrapper'>
        {!showEmailLink && (
          <>
            <Text center isTitle>
              Inscripción
            </Text>

            <Space small />

            {marathonsData?.marathons.length > 0 && (
              <Text center isSectionTitle>
                Elige tu Bodymaraton
              </Text>
            )}

            <Space medium />

            <Text fontSize='18' isBold center color='primary'>
              ¡Solo tenemos 20 plazas disponibles para la prueba gratuita!
            </Text>

            <Space extraSmall />

            <Text center color='disabled'>
              Plazas restantes: {20 - marathonsData?.marathons[0]?.participants}
            </Text>

            <Space big />
          </>
        )}

        {!showEmailLink && (
          <div className='user-marathons'>
            {marathonsData?.marathons.length > 0 ? (
              marathonsData?.marathons.map((ele, i) => (
                <MarathonCard
                  marathon={ele}
                  handleSelectMarathon={handleSelectMarathon}
                  key={`marathon-card-${i}`}
                  disabled={
                    i === 0 &&
                    20 - marathonsData?.marathons[0]?.participants === 0
                  }
                />
              ))
            ) : (
              <Text color='primary'>No hay próximas maratones</Text>
            )}
          </div>
        )}

        {showEmailLink && (
          <div className='background-2 '>
            <Text fontSize='18' center>
              ¡Enhorabuena, te has registrado con éxito!
            </Text>

            <Space extraSmall />

            <Text fontSize='14' center>
              Revisa tu correo electrónico
            </Text>

            <Space big />

            <div className='background-3'>
              <Text center>La maratón empieza el:</Text>

              <Space extraSmall />

              <Text isUppercase isBold center>
                {formatDateLong(marathon.startDate)}
              </Text>
            </div>

            <Space big />

            <Text fontSize='18' isUppercase isBold center color='primary'>
              ¡Prepárate para la acción!
            </Text>

            <Space small />

            <Link to={frontRoutes.login}>
              <Text fontSize='18' center color='primary'>
                ¡Completa tu registro!
              </Text>
            </Link>
          </div>
        )}

        {/* {marathonsData?.marathons.length > 0 && showEmailLink && (
        <Link to={frontRoutes.login}>
          <Text center color='primary'>
            LOGIN LINK - RECIBIDO EN @MAIL
          </Text>
        </Link>
      )} */}

        {/* <Text color='disabled' fontSize='14' center>
        Aqui se abriria la applicación del banco y mandariamos un email para
        confirmar el correo electrónico.
      </Text> */}

        {/* <Space big /> */}
      </div>
    </div>
  );
}

export default Payment;
