import React, { useEffect, useState } from 'react';
import Text from '../text/Text';
import Space from '../space/Space';
import Input from '../input/Input';
import registerValidator from '../../utils/validators/registerValidator';
import { useProfileMutation } from '../../slices/usersApiSlices';
import toast from 'react-hot-toast';
import Button from '../button/Button';
import { useTranslation } from 'react-i18next';

function RegisterFormTwo({ onSuccess, userData }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ ...userData });
  const [invalidFields, setInvalidFields] = useState('');

  const [updateProfile] = useProfileMutation();

  useEffect(() => {
    if (userData) {
      setFormData(userData);
    }
  }, [userData]);

  const handleOnChange = ({ name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const errors = registerValidator(2, formData);
    setInvalidFields(errors);

    if (errors.length > 0) {
      return;
    }

    try {
      await updateProfile({ ...formData }).unwrap();

      onSuccess(3);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Text isTitle>{t('bodySize')}:</Text>
      <Text fontSize='18'>{t('bodySizeHint')}</Text>

      <Space medium />

      <Input
        label={t('age')}
        placeholder=''
        type='number'
        onChange={handleOnChange}
        name='age'
        value={formData.age}
        error={{ invalidFields, message: t('ageRequired') }}
      />

      <Space small />

      <Input
        label={t('weight')}
        placeholder=''
        type='number'
        onChange={handleOnChange}
        name='weight'
        value={formData.weight}
        error={{ invalidFields, message: t('weightRequired') }}
      />

      <Space small />

      <Input
        label={t('height')}
        placeholder=''
        type='number'
        onChange={handleOnChange}
        name='height'
        value={formData.height}
        error={{
          invalidFields,
          message: t('heightRequired'),
        }}
      />

      <Space small />

      <Input
        label={t('chest')}
        placeholder=''
        type='number'
        onChange={handleOnChange}
        name='chest'
        value={formData.chest}
        error={{
          invalidFields,
          message: t('chestRequired'),
        }}
      />

      <Space small />

      <Input
        label={t('waist')}
        placeholder=''
        type='number'
        onChange={handleOnChange}
        name='waist'
        value={formData.waist}
        error={{ invalidFields, message: t('waistRequired') }}
      />

      <Space small />

      <Input
        label={t('buttocks')}
        placeholder=''
        type='number'
        onChange={handleOnChange}
        name='buttocks'
        value={formData.buttocks}
        error={{ invalidFields, message: t('buttocksRequired') }}
      />

      <Space big />

      <Button type='submit' isPrimary big center>
        {t('continue')}
      </Button>

      <Space medium />
    </form>
  );
}

export default RegisterFormTwo;
