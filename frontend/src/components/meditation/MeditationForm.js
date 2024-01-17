import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Text from '../text/Text';
import Space from '../space/Space';
import Input from '../input/Input';
import Button from '../button/Button';
import {
  useCreateMeditationMutation,
  useUpdateMeditationMutation,
} from '../../slices/meditationsApiSlice';
import { useTranslation } from 'react-i18next';

function MeditationForm({ data, onSuccess, isEdit }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(data || {});
  const [createMeditation] = useCreateMeditationMutation();
  const [updateMeditation] = useUpdateMeditationMutation();

  const handleOnChange = ({ name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateMeditation = async e => {
    e.preventDefault();

    try {
      await createMeditation(formData).unwrap();
      onSuccess();
      toast.success(t('created'));
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleEditMeditation = async e => {
    e.preventDefault();

    try {
      await updateMeditation(formData).unwrap();
      onSuccess();
      toast.success(t('updated'));
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className='workout-form'>
      <Text isTitle>{isEdit ? 'Edit meditation' : 'Create meditation'}</Text>

      <Space small />

      <form onSubmit={isEdit ? handleEditMeditation : handleCreateMeditation}>
        <div className='grid-container'>
          <Input
            className='cols-4'
            label={t('title')}
            name='title'
            placeholder='Title'
            onChange={handleOnChange}
            value={formData.title}
          />

          <Input
            className='cols-4'
            type='textarea'
            label={t('description')}
            placeholder={t('descriptionPlaceholder')}
            name='description'
            onChange={handleOnChange}
            value={formData.description}
          />

          <Input
            className='cols-4'
            label={t('audio')}
            name='audio'
            placeholder={t('audioLink')}
            onChange={handleOnChange}
            value={formData.audio}
          />

          <Input
            className='cols-4'
            label={t('image')}
            name='image'
            onChange={handleOnChange}
            value={formData.image}
            type='file'
          />

          <Input
            className='cols-4'
            label={t('minutes')}
            name='minutes'
            placeholder={t('placeholderNumber')}
            onChange={handleOnChange}
            value={formData.minutes}
          />
        </div>

        <Space medium />

        <Button isPrimary type='submit'>
          {isEdit ? t('edit') : t('create')}
        </Button>
      </form>
    </div>
  );
}

export default MeditationForm;
