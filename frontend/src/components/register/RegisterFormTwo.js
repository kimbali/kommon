import React, { useState } from 'react';
import Text from '../text/Text';
import Space from '../space/Space';
import Input from '../input/Input';
import { useDispatch } from 'react-redux';
import registerValidator from '../../utils/validators/registerValidator';
import { useProfileMutation } from '../../slices/usersApiSlices';
import toast from 'react-hot-toast';
import { setCredentials } from '../../slices/authSlice';
import Button from '../button/Button';

function RegisterFormTwo({ onSuccess, userInfo }) {
  const [formData, setFormData] = useState({});
  const [invalidFields, setInvalidFields] = useState('');

  const dispatch = useDispatch();

  const [updateProfile] = useProfileMutation();

  const handleOnChange = ({ name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const errors = registerValidator(2, formData);
    setInvalidFields(errors);

    if (errors) {
      return;
    }

    try {
      const res = await updateProfile({ ...formData, ...userInfo }).unwrap();

      dispatch(setCredentials({ ...res }));

      onSuccess(3);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Text isTitle>Medidas corporales:</Text>
      <Text fontSize='18'>Toma tus medidas corporales con un metro.</Text>

      <Space medium />

      <Input
        label='Edad:*'
        placeholder=''
        type='number'
        onChange={handleOnChange}
        name='age'
        value={formData.age}
        error={{ invalidFields, message: 'Age field required' }}
      />

      <Space small />

      <Input
        label='Peso, kg:*'
        placeholder=''
        type='number'
        onChange={handleOnChange}
        name='weight'
        value={formData.weight}
        error={{ invalidFields, message: 'Weight field required' }}
      />

      <Space small />

      <Input
        label='Altura, cm:*'
        placeholder=''
        type='number'
        onChange={handleOnChange}
        name='height'
        value={formData.height}
        error={{
          invalidFields,
          message: 'Height password field required',
        }}
      />

      <Space small />

      <Input
        label='Pecho, cm:*'
        placeholder=''
        type='number'
        onChange={handleOnChange}
        name='chest'
        value={formData.chest}
        error={{
          invalidFields,
          message: 'Chest field required',
        }}
      />

      <Space small />

      <Input
        label='Cintura, cm:*'
        placeholder=''
        type='number'
        onChange={handleOnChange}
        name='waist'
        value={formData.waist}
        error={{ invalidFields, message: 'Waist field required' }}
      />

      <Space small />

      <Input
        label='Gluteos, cm:*'
        placeholder=''
        type='number'
        onChange={handleOnChange}
        name='buttocks'
        value={formData.buttocks}
        error={{ invalidFields, message: 'Buttocks field required' }}
      />

      <Space big />

      <Button type='submit' isPrimary big center>
        Continue
      </Button>

      <Space medium />
    </form>
  );
}

export default RegisterFormTwo;
