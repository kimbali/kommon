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
      <Text isTitle>Actualizar parámetros</Text>

      <Space small />

      <Input
        label='Peso, kg*'
        name='weight'
        placeholder='0'
        onChange={handleOnChange}
        value={formData?.weight}
        type='number'
      />

      <Space small />

      <Input
        label='Pecho'
        name='chest'
        placeholder='0'
        onChange={handleOnChange}
        value={formData?.chest}
        type='number'
      />

      <Space small />

      <Input
        label='Cintura'
        name='waist'
        placeholder='0'
        onChange={handleOnChange}
        value={formData?.waist}
        type='number'
      />

      <Space small />

      <Input
        label='Cadera'
        name='buttocks'
        placeholder='0'
        onChange={handleOnChange}
        value={formData?.buttocks}
        type='number'
      />

      <Button isPrimary center type='submit'>
        Guardar
      </Button>
    </form>
  );
}

export default BodyParametersForm;
