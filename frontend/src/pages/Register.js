import React, { useEffect, useState } from 'react';
import Space from '../components/space/Space';
import TextedLogo from '../components/header/TextedLogo';
import { registerRedirectValidator } from '../utils/validators/registerValidator';
import RegisterFormOne from '../components/register/RegisterFormOne';
import RegisterFormTwo from '../components/register/RegisterFormTwo';
import RegisterFormThree from '../components/register/RegisterFormThree';
import RegisterFormFour from '../components/register/RegisterFormFour';
import Text from '../components/text/Text';
import Button from '../components/button/Button';
import RegisterGiftSelect from '../components/register/RegisterGiftSelect';
import { useGetUserProfileQuery } from '../slices/usersApiSlices';
import { scrollToTop } from '../utils/layoutHelpers';
import { useTranslation } from 'react-i18next';
import UseQuery from '../hooks/UseQuery';
import frontRoutes from '../config/frontRoutes';
import Spinner from '../components/spinner/Spinner';

function Register() {
  const { t } = useTranslation();
  let query = UseQuery();

  const [loading, setLoading] = useState(false);
  const [currentForm, setcurrentForm] = useState();
  const [giftSelected, setGiftSelected] = useState();
  const [hasGift, setHasGift] = useState(query.get('gift'));

  const { data: userData, refetch: refetchUser } = useGetUserProfileQuery();

  useEffect(() => {
    refetchUser();
  }, []);

  useEffect(() => {
    setLoading(true);
    const redirectTo = registerRedirectValidator(userData);

    if (redirectTo) {
      setcurrentForm(redirectTo);
    }
    setLoading(false);
  }, [userData]);

  const handleStep = async nextStep => {
    await refetchUser();

    setcurrentForm(nextStep);
    scrollToTop();
  };

  const registerSteps = [
    {
      label: t('info'),
      step: 1,
    },
    {
      label: t('measures'),
      step: 2,
    },
    {
      label: t('survey'),
      step: 3,
    },
    {
      label: t('done'),
      step: 4,
    },
  ];

  return (
    <div className='page-wrapper'>
      <Space medium />

      <header>
        <TextedLogo redirect={frontRoutes.home} />
      </header>

      <div className='content-wrapper'>
        <Text isBold fontSize='18'>
          {t('fillTheForm')}
        </Text>

        <Text fontSize='18'>{t('startTheChange')}</Text>

        <Space medium />

        <div className='register-steps'>
          {registerSteps.map((ele, i) => (
            <div
              className={`single-step ${i < currentForm ? 'active' : ''} ${
                !userData ? 'disabled' : ''
              }`}
              key={`register-step${i}`}
            >
              <Button
                disabled={!userData}
                onClick={() => handleStep(i + 1)}
                isPrimary
              >
                {ele.step}
              </Button>

              <Text className='step-label'>{ele.label}</Text>
            </div>
          ))}
        </div>

        <Space medium />

        {loading && (
          <div className='center'>
            <Spinner type='lds-heart' />
          </div>
        )}

        {!userData && currentForm === 1 && (
          <RegisterGiftSelect
            setGiftSelected={setGiftSelected}
            giftSelected={giftSelected}
            hasGift={hasGift}
            setHasGift={setHasGift}
          />
        )}

        <Space big />

        {currentForm === 1 && (
          <RegisterFormOne
            onSuccess={handleStep}
            giftSelected={giftSelected}
            userData={userData}
            hasGift={hasGift}
          />
        )}

        {currentForm === 2 && (
          <RegisterFormTwo onSuccess={handleStep} userData={userData} />
        )}

        {currentForm === 3 && (
          <RegisterFormThree onSuccess={handleStep} userData={userData} />
        )}

        {currentForm === 4 && userData && (
          <RegisterFormFour userData={userData} />
        )}
      </div>
    </div>
  );
}

export default Register;
