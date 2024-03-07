import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Text from '../text/Text';
import Space from '../space/Space';
import Input from '../input/Input';
import Button from '../button/Button';
import {
  useCreateWorkoutMutation,
  useUpdateWorkoutMutation,
} from '../../slices/workoutsApiSlice';
import levelsEnum from '../../config/enums/levelsEnum';
import { useTranslation } from 'react-i18next';

function WorkoutForm({ data, onSuccess, isEdit }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(data || {});
  const [createWorkout] = useCreateWorkoutMutation();
  const [updateWorkout] = useUpdateWorkoutMutation();

  const handleOnChange = ({ name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateRecipe = async e => {
    e.preventDefault();

    try {
      await createWorkout(formData).unwrap();
      onSuccess();
      toast.success(t('created'));
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleEditRecipe = async e => {
    e.preventDefault();

    try {
      await updateWorkout(formData).unwrap();
      onSuccess();
      toast.success(t('updated'));
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className='workout-form'>
      <Text isTitle>{isEdit ? 'Edit workout' : 'Create workout'}</Text>

      <Space small />

      <form onSubmit={isEdit ? handleEditRecipe : handleCreateRecipe}>
        <div className='grid-container'>
          <Input
            className='cols-4'
            label={t('title')}
            name='title'
            placeholder={t('workout')}
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
            label={t('video')}
            name='video'
            placeholder={t('vimeoLink')}
            onChange={handleOnChange}
            value={formData.video}
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

          <Input
            className='cols-4'
            name='level'
            label={t('level')}
            isSingleSelect
            options={levelsEnum}
            onChange={handleOnChange}
            defaultValue={levelsEnum.find(ele => ele.value === formData.level)}
          />
        </div>

        <Space medium />

        <div className='content-on-the-right'>
          <Button isPrimary type='submit'>
            {isEdit ? 'Edit workout' : 'Create workout'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default WorkoutForm;
