import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useResetPasswordMutation } from '../slices/usersApiSlices';
import toast from 'react-hot-toast';
import Space from '../components/space/Space';
import Button from '../components/button/Button';
import Input from '../components/input/Input';
import Text from '../components/text/Text';
import frontRoutes from '../config/frontRoutes';
import TextedLogo from '../components/header/TextedLogo';
import { useTranslation } from 'react-i18next';

const ResetPassword = () => {
  const { t } = useTranslation();
  const params = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [token, setToken] = useState('');
  const [formData, setFormData] = useState({
    email: JSON.parse(localStorage.getItem('userInfo'))?.email || '',
  });

  useEffect(() => {
    setToken(params.hash.replace('#', ''));
    if (!params.hash) {
      navigate(frontRoutes.login);
    }
  }, []);

  const [resetPassword] = useResetPasswordMutation();

  const handleOnChange = ({ name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(false);

    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError(true);
      toast.error(t('noPasswordMatch'));
      return;
    }

    try {
      await resetPassword({
        newPassword: formData.password,
        token,
      });

      toast.success(t('passwordChanged'));
      navigate(frontRoutes.login);
    } catch (err) {
      toast.error(t('error'));
    }
  };

  return (
    <div className='page-wrapper'>
      <Space medium />

      <TextedLogo redirect={frontRoutes.home} />

      <form className='content-wrapper' onSubmit={handleSubmit}>
        <Text isTitle>{t('resetPassword')}</Text>

        <Space medium />

        <Input
          label={t('newPassword')}
          name='password'
          placeholder={t('passwordPlaceholder')}
          onChange={handleOnChange}
          value={formData.password}
        />

        <Space medium />

        <Input
          label={t('repeatPassword')}
          name='confirmPassword'
          placeholder={t('passwordPlaceholder')}
          onChange={handleOnChange}
          value={formData.confirmPassword}
        />

        {error && (
          <>
            <Space big />
            <Text>{t('noPasswordMatch')}</Text>
          </>
        )}

        <Space big />

        <div className='content-left-and-right reverse center allways'>
          <Button type='submit' isPrimary>
            {t('continue')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
