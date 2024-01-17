import React, { useEffect, useState } from 'react';
import Space from '../components/space/Space';
import { useLocation } from 'react-router-dom';
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

function Register() {
  const { t } = useTranslation();
  const { state } = useLocation();
  const [currentForm, setcurrentForm] = useState();
  const [giftSelected, setGiftSelected] = useState();
  const [hasGift, setHasGift] = useState(state?.withGift);

  const { data: userData, refetch: refetchUser } = useGetUserProfileQuery();

  useEffect(() => {
    const redirectTo = registerRedirectValidator(userData);

    if (redirectTo) {
      setcurrentForm(redirectTo);
    }
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
        <TextedLogo />
      </header>

      <div className='content-wrapper'>
        <Text isBold fontSize='18'>
          {t('fillTheForm')}
        </Text>

        <Text fontSize='18'>{t('startTheChange')}</Text>

        {userData && (
          <>
            <Space medium />

            <div className='register-steps'>
              {registerSteps.map((ele, i) => (
                <div
                  className={`single-step ${i < currentForm ? 'active' : ''}`}
                  key={`register-step${i}`}
                >
                  <Button onClick={() => handleStep(i + 1)} isPrimary>
                    {ele.step}
                  </Button>

                  <Text className='step-label'>{ele.label}</Text>
                </div>
              ))}
            </div>
          </>
        )}

        <Space medium />

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

        {currentForm === 4 && <RegisterFormFour userData={userData} />}
      </div>
    </div>
  );
}

export default Register;
