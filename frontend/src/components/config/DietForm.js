import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Input from '../input/Input';
import Space from '../space/Space';
import Button from '../button/Button';
import Text from '../text/Text';
import { useTranslation } from 'react-i18next';
import {
  useCreateDietMutation,
  useUpdateDietMutation,
} from '../../slices/dietsApiSlice';
import yesNoEnum from '../../config/enums/yesNoEnum';

function DietForm({ data, onSuccess }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({});
  const [createDiet] = useCreateDietMutation();
  const [updateDiet] = useUpdateDietMutation();

  const handleOnChange = ({ name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    setFormData({ ...data });

    return () => {
      setFormData();
    };
  }, [data]);

  const handleOnSubmit = async e => {
    e.preventDefault();

    try {
      if (data) {
        await updateDiet({ ...formData }).unwrap();
        toast.success(t('updated'));
      } else {
        await createDiet({ ...formData }).unwrap();
        toast.success(t('created'));
      }

      onSuccess();
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      <Text isTitle>{data ? t('modifyDiet') : t('newDiet')}</Text>

      <Space medium />

      <form onSubmit={handleOnSubmit}>
        <Input
          label={t('regionName')}
          name='name'
          value={formData.name}
          placeholder={t('diet')}
          onChange={handleOnChange}
        />

        <Space medium />

        <Input
          label={t('activate')}
          name='isActive'
          type='radio'
          onChange={handleOnChange}
          selectedOption={formData.isActive}
          options={yesNoEnum}
        />

        <Space medium />

        <div className='content-on-the-right'>
          <Button isPrimary type='submit'>
            {data ? t('update') : t('create')}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default DietForm;
