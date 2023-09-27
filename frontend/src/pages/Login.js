import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlices';
import { setCredentials } from '../slices/authSlice';
import toast from 'react-hot-toast';
import Space from '../components/space/Space';
import Button from '../components/button/Button';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import Input from '../components/input/Input';
import Text from '../components/text/Text';
import registerValidator from '../utils/validators/registerValidator';
import frontRoutes from '../config/frontRoutes';

const Login = () => {
  const [formData, setFormData] = useState({});
  const [invalidFields, setInvalidFields] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

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
    if (errors) {
      setInvalidFields(errors);
      return;
    }

    const { email, password } = formData;

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <form className='wrapper' onSubmit={handleSubmit}>
      <Text isTitle>Marathon</Text>

      <Space small />

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
          label='password*'
          name='password'
          placeholder='*****'
          onChange={handleOnChange}
          value={formData.password}
          error={{ invalidFields, message: 'Password field required' }}
        />
      </div>

      <Space big />

      <div className='content-on-the-right'>
        <Button type='submit' isPrimary iconLeft={faDumbbell}>
          Login
        </Button>
      </div>
    </form>
  );
};

export default Login;
