import React, { useState } from 'react';
import Text from '../text/Text';
import Space from '../space/Space';
import Input from '../input/Input';
import Button from '../button/Button';
import { useUpdateProgressMutation } from '../../slices/progressApiSlice';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useProgress } from '../../context/progressContext';
import { useDate } from '../../context/dateContext';

function BodyParametersForm({ onSave }) {
  const { t } = useTranslation();
  const { userProgress } = useProgress();
  const { currentDay } = useDate();

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

      progress.weight[currentDay.week - 1] = +formData.weight;
      progress.chest[currentDay.week - 1] = +formData.chest;
      progress.waist[currentDay.week - 1] = +formData.waist;
      progress.buttocks[currentDay.week - 1] = +formData.buttocks;

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
