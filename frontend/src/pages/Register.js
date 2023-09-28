import React, { useEffect, useState } from 'react';
import Button from '../components/button/Button';
import Text from '../components/text/Text';
import Space from '../components/space/Space';
import Input from '../components/input/Input';
import { useRegisterMutation } from '../slices/usersApiSlices';
import { setCredentials } from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import registerValidator from '../utils/validators/registerValidator';
import frontRoutes from '../config/frontRoutes';

function Register() {
  const [formData, setFormData] = useState({});
  const [invalidFields, setInvalidFields] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register] = useRegisterMutation();

  const { userInfo } = useSelector(state => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || frontRoutes.main;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const handleOnChange = ({ name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const errors = registerValidator(formData);
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
          name,
          email,
          password,
          city,
          phone,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <form className='wrapper' onSubmit={handleSubmit}>
      <Text isTitle>Registro marathon</Text>

      <Space small />

      <Text isBold>Rellenar el formulario</Text>
      <Text>Comienza tu camino hacia la transformación</Text>

      <Space medium />

      <div className='grid-container'>
        <Input
          className='cols-2'
          label='email*'
          name='email'
          placeholder='hello@bodymarathon.com'
          onChange={handleOnChange}
          value={formData.email}
          error={{ invalidFields, message: 'Email field required' }}
        />

        <Input
          className='cols-2'
          label='name*'
          name='name'
          placeholder='Full name'
          onChange={handleOnChange}
          value={formData.name}
          error={{ invalidFields, message: 'Name field required' }}
        />

        <Input
          className='cols-2'
          label='Phone number'
          name='phone'
          placeholder='+34 000 000 000'
          onChange={handleOnChange}
          value={formData.phone}
        />

        <Input
          className='cols-2'
          label='Ciudad'
          name='city'
          placeholder='Barcelona'
          onChange={handleOnChange}
          value={formData.city}
        />

        <Input
          className='cols-2'
          label='password*'
          name='password'
          placeholder='*****'
          onChange={handleOnChange}
          value={formData.password}
          error={{ invalidFields, message: 'Password field required' }}
        />

        <Input
          className='cols-2'
          label='Confirm password*'
          name='confirmPassword'
          placeholder='*****'
          onChange={handleOnChange}
          value={formData.confirmPassword}
          error={{ invalidFields, message: 'Confirm password field required' }}
        />
      </div>

      <Space big />

      <div className='content-on-the-right'>
        <Link to={frontRoutes.login}>Login</Link>

        <Button type='submit' isPrimary iconLeft={faDumbbell}>
          Register
        </Button>
      </div>
    </form>
  );
}

export default Register;
