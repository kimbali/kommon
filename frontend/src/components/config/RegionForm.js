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

function RegionForm({ data, onSuccess }) {
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
        toast.success('Updated');
      } else {
        await createRegion({ ...formData }).unwrap();
        toast.success('Created');
      }

      onSuccess();
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      <Text isTitle>{data ? 'Modificar region' : 'Nueva region'}</Text>

      <Space medium />

      <form onSubmit={handleOnSubmit}>
        <Input
          label='Nombre de la region'
          name='region'
          value={formData.region}
          placeholder='Region'
          onChange={handleOnChange}
        />

        <Space medium />

        <Input
          label='Precio gastos de envio'
          type='number'
          name='price'
          value={formData.price}
          placeholder='Price'
          onChange={handleOnChange}
        />

        <Space medium />

        <div className='content-on-the-right'>
          <Button isPrimary type='submit'>
            {data ? 'Update region' : 'Create region'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default RegionForm;
