import React, { useState } from 'react';
import Text from '../text/Text';
import Space from '../space/Space';
import Input from '../input/Input';
import Button from '../button/Button';
import { useUpdateProgressMutation } from '../../slices/progressApiSlice';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useProgress } from '../../context/progressContext';

function BodyParametersForm({ onSave }) {
  const { t } = useTranslation();
  const { userProgress } = useProgress();

  const [formData, setFormData] = useState();
  const [updateProgress] = useUpdateProgressMutation();

  const handleOnChange = ({ name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = async e => {
    e.preventDefault();

    try {
      let progress = { ...userProgress };

      progress.weight = [...progress.weight];
      progress.chest = [...progress.chest];
      progress.waist = [...progress.waist];
      progress.buttocks = [...progress.buttocks];

      formData.weight &&
        progress.weight.push({ value: +formData.weight, date: new Date() });
      formData.chest &&
        progress.chest.push({ value: +formData.chest, date: new Date() });
      formData.waist &&
        progress.waist.push({ value: +formData.waist, date: new Date() });
      formData.buttocks &&
        progress.buttocks.push({ value: +formData.buttocks, date: new Date() });

      await updateProgress({ ...userProgress, ...progress });

      onSave({ ...userProgress, ...progress });
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <Text isTitle>{t('updateParameters')}</Text>

      <Space extraSmall />

      <Text>{t('parametresHelp')}</Text>

      <Space medium />

      <Input
        label={t('weightKg')}
        name='weight'
        placeholder={t('placeholderNumber')}
        onChange={handleOnChange}
        value={formData?.weight}
        type='number'
      />

      <Space small />

      <Input
        label={t('chestCm')}
        name='chest'
        placeholder={t('placeholderNumber')}
        onChange={handleOnChange}
        value={formData?.chest}
        type='number'
      />

      <Space small />

      <Input
        label={t('waistCm')}
        name='waist'
        placeholder={t('placeholderNumber')}
        onChange={handleOnChange}
        value={formData?.waist}
        type='number'
      />

      <Space small />

      <Input
        label={t('buttocksCm')}
        name='buttocks'
        placeholder={t('placeholderNumber')}
        onChange={handleOnChange}
        value={formData?.buttocks}
        type='number'
      />

      <Space medium />

      <Button isPrimary center type='submit'>
        {t('save')}
      </Button>
    </form>
  );
}

export default BodyParametersForm;
