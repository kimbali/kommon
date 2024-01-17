import React, { useState } from 'react';
import Text from '../text/Text';
import Space from '../space/Space';
import Input from '../input/Input';
import Button from '../button/Button';
import { useUpdateProgressMutation } from '../../slices/progressApiSlice';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

function BodyParametersForm() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState();
  const [updateProgress] = useUpdateProgressMutation();

  const handleOnChange = ({ name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = async () => {
    try {
      await updateProgress(formData);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <Text isTitle>{t('updateParameters')}</Text>

      <Space small />

      <Input
        label={t('weight')}
        name='weight'
        placeholder={t('placeholderNumber')}
        onChange={handleOnChange}
        value={formData?.weight}
        type='number'
      />

      <Space small />

      <Input
        label={t('chest')}
        name='chest'
        placeholder={t('placeholderNumber')}
        onChange={handleOnChange}
        value={formData?.chest}
        type='number'
      />

      <Space small />

      <Input
        label={t('waist')}
        name='waist'
        placeholder={t('placeholderNumber')}
        onChange={handleOnChange}
        value={formData?.waist}
        type='number'
      />

      <Space small />

      <Input
        label={t('buttocks')}
        name='buttocks'
        placeholder={t('placeholderNumber')}
        onChange={handleOnChange}
        value={formData?.buttocks}
        type='number'
      />

      <Button isPrimary center type='submit'>
        {t('save')}
      </Button>
    </form>
  );
}

export default BodyParametersForm;
