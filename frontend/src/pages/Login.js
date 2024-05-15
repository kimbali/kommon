import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  useForgotPasswordMutation,
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
import getTokenFromlocalStorage from '../utils/tokenStorage';
import { useMarathon } from '../context/marathonContext';
import Modal from '../components/modal/Modal';
import templateResetPassword from '../components/emails/templateResetPassword';

const Login = () => {
  const { t } = useTranslation();
  const { updateUser } = useUser();
  const { setMarathonId } = useMarathon();
  const [formData, setFormData] = useState({
    email: JSON.parse(localStorage.getItem('userInfo'))?.email || '',
  });
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [invalidFields, setInvalidFields] = useState('');
  const [token, setToken] = useState(getTokenFromlocalStorage());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login] = useLoginMutation();
  const { refetch: refetchProfile } = useGetUserProfileQuery(token);
  const [forgotPassword] = useForgotPasswordMutation();

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

  const handleSubmitResetPassword = async e => {
    e.preventDefault();
    setInvalidFields();

    if (!formData.email) {
      setInvalidFields(['email']);
      return;
    }

    try {
      const templateHTML = await templateResetPassword();

      await forgotPassword({ email: formData.email, template: templateHTML });
    } catch (err) {
      toast.error(t('error'));
    }

    setShowResetPassword(false);
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

        <div className='content-left-and-right reverse center allways'>
          <Button onClick={() => setShowResetPassword(true)} isLink>
            {t('resetPassword')}
          </Button>

          <Button type='submit' isPrimary>
            {t('continue')}
          </Button>
        </div>
      </form>

      {showResetPassword && (
        <Modal onClose={setShowResetPassword} isSecondary>
          <form onSubmit={handleSubmitResetPassword}>
            <Text isTitle>{t('resetPasswordEmail')}</Text>

            <Space small />

            <Text isSubtitle>{t('resetPasswordText')}</Text>

            <Space medium />

            <Input
              name='email'
              placeholder={t('emailPlaceholder')}
              onChange={handleOnChange}
              value={formData.email}
              error={{ invalidFields, message: 'Email field required' }}
            />

            <Space big />

            <Button center type='submit' isPrimary>
              {t('sendEmail')}
            </Button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Login;
