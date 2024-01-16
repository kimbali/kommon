import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Text from '../text/Text';
import Space from '../space/Space';
import Input from '../input/Input';
import registerValidator from '../../utils/validators/registerValidator';
import toast from 'react-hot-toast';
import Button from '../button/Button';
import frontRoutes from '../../config/frontRoutes';
import { useGetRegionsQuery } from '../../slices/regionsApiSlice';
import { useTranslation } from 'react-i18next';

function RegisterFormOne({ onSuccess, giftSelected, userData, hasGift }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ ...userData });
  const [selectedCity, setSelectedCity] = useState();
  const [invalidFields, setInvalidFields] = useState('');
  const [regionOptions, setRegionOptions] = useState();

  const { data: regionsData } = useGetRegionsQuery({});

  useEffect(() => {
    if (userData) {
      setFormData(userData);
    }
  }, [userData]);

  useEffect(() => {
    if (regionsData) {
      const regionsList = regionsData.regions.map(ele => {
        return { label: ele.region, value: ele._id };
      });

      setRegionOptions(regionsList);
    }
  }, [regionsData]);

  useEffect(() => {
    if (userData && regionOptions) {
      setSelectedCity(
        regionOptions.find(ele => ele.value === userData.city._id)
      );
    }
  }, [regionOptions]);

  const handleOnChange = ({ name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleCityChange = ({ value, label }) => {
    setSelectedCity({ label, value });
    setFormData({ ...formData, city: value });
  };

  const handlePayNow = e => {
    e.preventDefault();

    let errors = [];
    errors = errors.concat(registerValidator(1, formData));

    if (!userData) {
      errors = errors.concat(registerValidator(11, formData));
    }

    if (hasGift && !userData) {
      errors = errors.concat(registerValidator(12, formData));

      if (!giftSelected) {
        errors = errors.concat('selectGift');
      }
    }

    setInvalidFields(errors);

    if (errors.length > 0) {
      return;
    }

    if (!userData) {
      const { password, confirmPassword } = formData;

      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }

      navigate(frontRoutes.payment, { state: formData });
    } else {
      onSuccess(2);
    }
  };

  return (
    <div>
      <form onSubmit={handlePayNow} className='personal-info-form'>
        <Text isTitle>Información general:</Text>
        <Text fontSize='18'>¡Explícanos más sobre ti, antes de empezar!</Text>

        <Space medium />

        <Input
          label='E-mail:*'
          name='email'
          placeholder='email@email.com'
          onChange={handleOnChange}
          value={formData.email}
          error={{ invalidFields, message: 'Email field required' }}
          disabled={!!userData}
        />

        <Space small />

        <Input
          label='Nombre completo:*'
          name='name'
          placeholder='Full name'
          onChange={handleOnChange}
          value={formData.name}
          error={{ invalidFields, message: 'Name field required' }}
        />

        <Space small />

        <Input
          label='Número de teléfono:*'
          name='phone'
          placeholder='+34 000 000 000'
          onChange={handleOnChange}
          value={formData.phone}
          error={{
            invalidFields,
            message: 'Phone field required',
          }}
        />

        <Space small />

        {hasGift && (
          <Input
            label='En que zona te encuentras'
            placeholder='Selecciona ninguna'
            options={regionOptions}
            onChange={handleCityChange}
            selectedOption={selectedCity}
            isSingleSelect
            name='city'
            error={{ invalidFields, message: 'Localizacion field required' }}
          />
        )}

        {!userData && hasGift && (
          <>
            <Space small />

            <Input
              label={`Dirección de envio${
                !giftSelected ? ' (¡Selecciona un regalo!)' : ''
              }:*`}
              name='address'
              placeholder='Dirección completa'
              onChange={handleOnChange}
              value={formData.address}
              error={{
                invalidFields,
                message: 'Selecciona una dirección de envío para el regalo',
              }}
            />
          </>
        )}

        {!userData && (
          <>
            <Space small />

            <Input
              type='password'
              label='Contraseña:*'
              name='password'
              placeholder='*******'
              onChange={handleOnChange}
              value={formData.password}
              error={{ invalidFields, message: 'Password field required' }}
            />

            <Space small />

            <Input
              type='password'
              label='Confirmar contraseña:*'
              name='confirmPassword'
              placeholder='*******'
              onChange={handleOnChange}
              value={formData.confirmPassword}
              error={{
                invalidFields,
                message: 'Confirm password field required',
              }}
            />
          </>
        )}

        {!userData && (
          <>
            <Space medium />

            <Input
              name='termsAndConditions'
              type='checkbox'
              className={formData.termsAndConditions ? 'checked' : ''}
              label={
                <Text>
                  He leído y acepto los{' '}
                  <Link target='is_blank' to={frontRoutes.terms}>
                    términos y condiciones
                  </Link>
                </Text>
              }
              value={formData.termsAndConditions}
              onChange={handleOnChange}
            />

            <Input
              name='privacyPolicy'
              type='checkbox'
              className={formData.privacyPolicy ? 'checked' : ''}
              label={
                <Text>
                  He leído y acepto la{' '}
                  <Link target='is_blank' to={frontRoutes.privacyPolicy}>
                    política de privacidad
                  </Link>
                </Text>
              }
              value={formData.privacyPolicy}
              onChange={handleOnChange}
            />
          </>
        )}

        <Space big />

        <Button
          type='submit'
          isPrimary
          big
          center
          disabled={
            (!userData &&
              (!formData.termsAndConditions || !formData.privacyPolicy)) ||
            (!userData && hasGift && !giftSelected)
          }
        >
          {userData ? 'Continuar' : 'Pagar 29,90€'}
        </Button>

        <Space medium />

        {!userData && hasGift && !giftSelected && (
          <>
            <Space medium />

            <Text center error fontSize='16'>
              ¡Selecciona un regalo!
            </Text>
          </>
        )}

        <Space medium />
      </form>
    </div>
  );
}

export default RegisterFormOne;
