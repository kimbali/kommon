import React, { useState } from 'react';
import Button from '../button/Button';
import Text from '../text/Text';
import Space from '../space/Space';
import Input from '../input/Input';
import { useRegisterMutation } from '../../slices/usersApiSlices';
import yesNoEnum from '../../config/enums/yesNoEnum';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

function NewUser({ onCreate, onCancel, user }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ ...user });
  const [invalidFields, setInvalidFields] = useState([]);

  const handleOnChange = ({ name, value: valueProp }) => {
    let value = valueProp;
    if (name === 'isAdmin' || name === 'hasPaid') {
      value = valueProp === 'NO' ? false : true;
    }
    setFormData({ ...formData, [name]: value });
  };

  const [register] = useRegisterMutation();

  const handleSubmit = async e => {
    e.preventDefault();
    setInvalidFields([]);

    if (!formData.email) {
      return setInvalidFields(['email']);
    }

    if (!formData.password) {
      return setInvalidFields(['password']);
    }

    try {
      await register({ ...formData, createdByAdmin: true }).unwrap();

      toast.success(t('userCreated'));
    } catch (err) {
      toast.error(err.message);
    }

    onCreate();
  };

  return (
    <form onSubmit={handleSubmit} className='new-user-form'>
      <Text isTitle>{t('createNewUser')}</Text>

      <Space small />

      <Input
        label={t('email')}
        name='email'
        placeholder={t('emailPlaceholder')}
        onChange={handleOnChange}
        value={formData.email}
        error={{ invalidFields, message: t('emailRequired') }}
      />

      <Space small />

      <Input
        label={t('name')}
        name='name'
        placeholder={t('userName')}
        onChange={handleOnChange}
        value={formData.name}
      />

      <Space small />

      <Input
        label={t('password')}
        name='password'
        placeholder={t('passwordPlaceholder')}
        onChange={handleOnChange}
        value={formData.password}
        error={{ invalidFields, message: t('passwordRequired') }}
      />

      <Space small />

      <Input
        label={t('adminUserAsk')}
        placeholder=''
        type='radio'
        onChange={handleOnChange}
        name='isAdmin'
        selectedOption={formData.isAdmin ? 'YES' : 'NO'}
        options={yesNoEnum}
      />

      <Space small />

      <Input
        label={t('hasPaidAsk')}
        placeholder=''
        type='radio'
        onChange={handleOnChange}
        name='hasPaid'
        selectedOption={formData.hasPaid ? 'YES' : 'NO'}
        options={yesNoEnum}
      />

      <Space big />

      <div className='content-on-the-right'>
        <Button onClick={onCancel} isSecondary>
          {t('cancel')}
        </Button>

        <Button type='submit' isPrimary>
          {t('create')} {t('user')}
        </Button>
      </div>
    </form>
  );
}

export default NewUser;
