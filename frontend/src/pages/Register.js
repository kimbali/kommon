import React, { useEffect, useState } from 'react';
import Space from '../components/space/Space';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import frontRoutes from '../config/frontRoutes';
import TextedLogo from '../components/header/TextedLogo';
import { registerRedirectValidator } from '../utils/validators/registerValidator';
import RegisterFormOne from '../components/register/RegisterFormOne';
import RegisterFormTwo from '../components/register/RegisterFormTwo';
import RegisterFormThree from '../components/register/RegisterFormThree';
import RegisterFormFour from '../components/register/RegisterFormFour';
import Text from '../components/text/Text';
import Button from '../components/button/Button';

function Register() {
  const [currentForm, setcurrentForm] = useState();
  const navigate = useNavigate();

  const { userInfo } = useSelector(state => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || frontRoutes.main;

  useEffect(() => {
    const redirectTo = registerRedirectValidator(userInfo);

    if (redirectTo) {
      setcurrentForm(redirectTo);
      return;
    }

    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const handleStep = nextStep => {
    setcurrentForm(nextStep);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const registerSteps = [
    {
      label: 'Info',
      step: 1,
    },
    {
      label: 'Measuring',
      step: 2,
    },
    {
      label: 'Survey',
      step: 3,
    },
    {
      label: 'Done',
      step: 4,
    },
  ];

  return (
    <div className='page-wrapper'>
      <Space medium />
      <div className='content-left-and-right'>
        <TextedLogo />

        {currentForm === 1 && (
          <Link className='login-cta' to={frontRoutes.login}>
            Login
          </Link>
        )}
      </div>

      <div className='content-wrapper'>
        <Text isBold fontSize='18'>
          Rellenar el formulario
        </Text>
        <Text fontSize='18'>Comienza tu camino hacia la transformación</Text>

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

        <Space medium />

        {currentForm === 1 && <RegisterFormOne onSuccess={handleStep} />}

        {currentForm === 2 && (
          <RegisterFormTwo onSuccess={handleStep} userInfo={userInfo} />
        )}

        {currentForm === 3 && (
          <RegisterFormThree onSuccess={handleStep} userInfo={userInfo} />
        )}

        {currentForm === 4 && <RegisterFormFour userInfo={userInfo} />}
      </div>
    </div>
  );
}

export default Register;
