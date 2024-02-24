import React, { useState } from 'react';
import Input from '../input/Input';
import { useTranslation } from 'react-i18next';
import { useProgress } from '../../context/progressContext';
import { useUpdateProgressMutation } from '../../slices/progressApiSlice';
import toast from 'react-hot-toast';
import Button from '../button/Button';
import Space from '../space/Space';
import Text from '../text/Text';

function BodyFotosForm({ onSave, time }) {
  const { t } = useTranslation();
  const { userProgress } = useProgress();

  const [formData, setFormData] = useState({ ...useProgress });

  const [updateProgress] = useUpdateProgressMutation();

  const handleOnChange = ({ name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = async e => {
    e.preventDefault();

    try {
      const updatedProgress = { ...userProgress, [time]: { ...formData } };
      await updateProgress({ ...updatedProgress });

      onSave({ ...updatedProgress });
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <Text isTitle>{t('uploadFotos')}</Text>

      <Space medium />

      <Input
        label={t('front')}
        name='front'
        onChange={handleOnChange}
        value={formData?.front}
        type='file'
      />

      <Space medium />

      <Input
        label={t('back')}
        name='back'
        onChange={handleOnChange}
        value={formData?.back}
        type='file'
      />

      <Space medium />

      <Input
        label={t('lateral')}
        name='lateral'
        onChange={handleOnChange}
        value={formData?.lateral}
        type='file'
      />

      <Space medium />

      <Button isPrimary center type='submit'>
        {t('save')}
      </Button>
    </form>
  );
}

export default BodyFotosForm;
