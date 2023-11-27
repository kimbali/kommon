import React, { useState } from 'react';
import Text from '../text/Text';
import Space from '../space/Space';
import Input from '../input/Input';
import { useDispatch } from 'react-redux';
import registerValidator from '../../utils/validators/registerValidator';
import { useRegisterMutation } from '../../slices/usersApiSlices';
import toast from 'react-hot-toast';
import { setCredentials } from '../../slices/authSlice';
import Button from '../button/Button';
import { Link } from 'react-router-dom';
import frontRoutes from '../../config/frontRoutes';

function RegisterFormOne({ onSuccess }) {
  const [formData, setFormData] = useState({});
  const [invalidFields, setInvalidFields] = useState('');

  const dispatch = useDispatch();

  const [register] = useRegisterMutation();
  const handleOnChange = ({ name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const errors = registerValidator(1, formData);
    setInvalidFields(errors);

    if (errors) {
      return;
    }

    const { password, confirmPassword, name, email, city, phone } = formData;

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register({
          email,
          password,
          phone,
          name,
          city,
        }).unwrap();

        dispatch(setCredentials({ ...res }));

        onSuccess(2);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className='personal-info-form'>
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
      />

      <Space small />

      <Input
        label='Contraseña:*'
        name='password'
        placeholder='*******'
        onChange={handleOnChange}
        value={formData.password}
        error={{ invalidFields, message: 'Password field required' }}
      />

      <Space small />

      <Input
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
        label='Ciudad:'
        name='city'
        placeholder='Alabama'
        onChange={handleOnChange}
        value={formData.city}
      />

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
      <Space big />

      <Button
        type='submit'
        isPrimary
        big
        center
        disabled={!formData.termsAndConditions || !formData.privacyPolicy}
      >
        Pagar ahora
      </Button>

      <Space medium />
    </form>
  );
}

export default RegisterFormOne;
