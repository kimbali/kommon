import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Input from '../input/Input';
import Space from '../space/Space';
import Button from '../button/Button';
import Text from '../text/Text';
import {
  useCreateRegionMutation,
  useUpdateRegionMutation,
} from '../../slices/regionsApiSlice';
import { useTranslation } from 'react-i18next';

function RegionForm({ data, onSuccess }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({});
  const [createRegion] = useCreateRegionMutation();
  const [updateRegion] = useUpdateRegionMutation();

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
        await updateRegion({ ...formData }).unwrap();
        toast.success(t('updated'));
      } else {
        await createRegion({ ...formData }).unwrap();
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
      <Text isTitle>{data ? t('modifyRegion') : t('newRegion')}</Text>

      <Space medium />

      <form onSubmit={handleOnSubmit}>
        <Input
          label={t('regionName')}
          name='region'
          value={formData.region}
          placeholder={t('region')}
          onChange={handleOnChange}
        />

        <Space medium />

        <Input
          label={t('sendCost')}
          type='number'
          name='price'
          value={formData.price}
          placeholder={t('price')}
          onChange={handleOnChange}
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

export default RegionForm;
