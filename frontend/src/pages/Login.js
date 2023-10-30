import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlices';
import { setCredentials } from '../slices/authSlice';
import toast from 'react-hot-toast';
import Space from '../components/space/Space';
import Button from '../components/button/Button';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import Input from '../components/input/Input';
import Text from '../components/text/Text';
import frontRoutes from '../config/frontRoutes';
import loginValidator from '../utils/validators/loginValidator';
import TextedLogo from '../components/header/TextedLogo';

const Login = () => {
  const [formData, setFormData] = useState({});
  const [invalidFields, setInvalidFields] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login] = useLoginMutation();

  const { userInfo } = useSelector(state => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate(userInfo.isAdmin ? frontRoutes.dietsConfig : frontRoutes.main);
    }
  }, [navigate, userInfo]);

  const handleOnChange = ({ name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const errors = loginValidator(formData);
    setInvalidFields(errors);

    if (errors) {
      return;
    }

    const { email, password } = formData;

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(res.isAdmin ? frontRoutes.dietsConfig : frontRoutes.main);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className='page-wrapper'>
      <TextedLogo />

      <form className='content-wrapper' onSubmit={handleSubmit}>
        <Text isTitle>Log In</Text>

        <Space medium />

        <Input
          label='email:'
          name='email'
          placeholder='hello@bodymarathon.com'
          onChange={handleOnChange}
          value={formData.email}
          error={{ invalidFields, message: 'Email field required' }}
        />

        <Space medium />

        <Input
          label='password:'
          name='password'
          placeholder='*****'
          onChange={handleOnChange}
          value={formData.password}
          error={{ invalidFields, message: 'Password field required' }}
        />

        <Space big />

        <div className='content-on-the-right'>
          <Link to={frontRoutes.register}>Register</Link>

          <Button type='submit' isPrimary>
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
