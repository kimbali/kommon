import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  useGetUserProfileQuery,
  useLoginMutation,
} from '../slices/usersApiSlices';
import { setCredentials } from '../slices/authSlice';
import toast from 'react-hot-toast';
import Space from '../components/space/Space';
import Button from '../components/button/Button';
import Input from '../components/input/Input';
import Text from '../components/text/Text';
import frontRoutes from '../config/frontRoutes';
import loginValidator from '../utils/validators/loginValidator';
import TextedLogo from '../components/header/TextedLogo';
import { useUser } from '../context/userContext';
import { useTranslation } from 'react-i18next';
import getTokenFromLocalStorage from '../utils/tokenStorage';
import { useMarathon } from '../context/marathonContext';

const Login = () => {
  const { t } = useTranslation();
  const { updateUser } = useUser();
  const { setMarathonId } = useMarathon();
  const [formData, setFormData] = useState({
    email: JSON.parse(localStorage.getItem('userInfo'))?.email || '',
  });
  const [invalidFields, setInvalidFields] = useState('');
  const [token, setToken] = useState(getTokenFromLocalStorage());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login] = useLoginMutation();
  const { refetch: refetchProfile } = useGetUserProfileQuery(token);

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
      await dispatch(setCredentials({ email: res.email, token: res.token }));

      setToken(res.token);

      const { data: userProfile } = await refetchProfile();

      updateUser({ ...userProfile });

      if (!res.isAdmin && !res.isFullRegistered) {
        navigate(frontRoutes.register);
      } else {
        setMarathonId(
          userProfile?.progresses[userProfile?.progresses?.length - 1]?.marathon
            ._id
        );
        navigate(res.isAdmin ? frontRoutes.marathonList : frontRoutes.main);
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className='page-wrapper'>
      <Space medium />

      <TextedLogo redirect={frontRoutes.home} />

      <form className='content-wrapper' onSubmit={handleSubmit}>
        <Text isTitle>{t('login')}</Text>

        <Space medium />

        <Input
          label={t('email')}
          name='email'
          placeholder={t('emailPlaceholder')}
          onChange={handleOnChange}
          value={formData.email}
          error={{ invalidFields, message: 'Email field required' }}
        />

        <Space medium />

        <Input
          label={t('password')}
          name='password'
          placeholder={t('passwordPlaceholder')}
          onChange={handleOnChange}
          value={formData.password}
          error={{ invalidFields, message: t('passwordRequired') }}
        />

        <Space big />

        <div className='content-on-the-right allways'>
          <Button type='submit' isPrimary>
            {t('continue')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
