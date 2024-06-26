import React, { useState } from 'react';
import Button from '../button/Button';
import Text from '../text/Text';
import Space from '../space/Space';
import Input from '../input/Input';
import {
  useRegisterMutation,
  useUpdateUserMutation,
} from '../../slices/usersApiSlices';
import yesNoEnum from '../../config/enums/yesNoEnum';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import CaloriesCalculator from '../../pages/CaloriesCalculator';
import BodyPhotos from '../progress/BodyPhotos';

function NewUser({ onCreate, onCancel, user }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ ...user });
  const [invalidFields, setInvalidFields] = useState([]);

  const [updatedUser] = useUpdateUserMutation();
  const [register] = useRegisterMutation();

  const handleOnChange = ({ name, value: valueProp }) => {
    let value = valueProp;
    if (name === 'isAdmin' || name === 'hasPaid') {
      value = valueProp === 'NO' ? false : true;
    }
    setFormData({ ...formData, [name]: value });
  };

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
      if (typeof user === 'object' && !!user) {
        await updatedUser({ ...formData }).unwrap();
      } else {
        await register({ ...formData, createdByAdmin: true }).unwrap();
      }

      toast.success(t('userCreated'));
    } catch (err) {
      toast.error(err.message);
    }

    onCreate();
  };

  return (
    <div className='new-user content-left-and-right'>
      <div className='new-user-form'>
        <form onSubmit={handleSubmit}>
          <Text isTitle>
            {typeof user === 'object' ? t('editUser') : t('createNewUser')}
          </Text>

          <Space small />

          <Input
            label={t('email')}
            name='email'
            placeholder={t('emailPlaceholder')}
            onChange={handleOnChange}
            value={formData.email}
            error={{ invalidFields, message: t('emailRequired') }}
            disabled={typeof user === 'object' && !!user}
          />

          <Space small />

          <Input
            type='password'
            label={t('password')}
            name='password'
            placeholder={t('passwordPlaceholder')}
            onChange={handleOnChange}
            value={formData?.password}
            error={{ invalidFields, message: 'Password field required' }}
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
              {t('save')}
            </Button>
          </div>
        </form>

        <Space big />

        <CaloriesCalculator isAdmin adminUser={user} />
      </div>

      <div>
        <Text isSectionTitle>Fotos inicio maratón</Text>
        <Space medium />
        <BodyPhotos
          photos={
            user?.progresses
              ? user?.progresses[user?.progresses?.length - 1]?.initialPhotos
              : ''
          }
          download
        />

        <Text isSectionTitle>Fotos final maratón</Text>
        <Space medium />
        <BodyPhotos
          photos={
            user?.progresses
              ? user?.progresses[user.progresses.length - 1].photoFinish
              : ''
          }
          download
        />
      </div>
    </div>
  );
}

export default NewUser;
