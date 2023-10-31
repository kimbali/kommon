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
import activityEnum from '../../config/enums/activitiesEnum';
import porpusesEnum from '../../config/enums/porpusesEnum';
import smokeEnum from '../../config/enums/smokeEnum';
import alcoholEnum from '../../config/enums/alcoholsEnum';
import problemsEnum from '../../config/enums/problemsEnum';
import patologyEnum from '../../config/enums/patologiesEnum';

function RegisterFormThree({ onSuccess, userInfo }) {
  const [formData, setFormData] = useState({});
  const [invalidFields, setInvalidFields] = useState('');

  const dispatch = useDispatch();

  const [updateProfile] = useProfileMutation();

  const handleOnChange = ({ name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const errors = registerValidator(3, formData);
    setInvalidFields(errors);

    if (errors) {
      return;
    }

    try {
      const res = await updateProfile({ ...formData, ...userInfo }).unwrap();

      dispatch(setCredentials({ ...res }));

      onSuccess(4);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Text isTitle>Cuestionario de salud:</Text>
      <Text fontSize='18'>Elige una opción para completar el formulario.</Text>

      <Space big />

      <Input
        label='Actividad física diaria:'
        placeholder=''
        type='radio'
        onChange={handleOnChange}
        name='activity'
        selectedOption={formData.activity}
        options={activityEnum}
        error={{ invalidFields, message: 'Activity field required' }}
      />

      <Space big />

      <Input
        label='¿Cuál es tu propósito?'
        placeholder=''
        type='radio'
        onChange={handleOnChange}
        name='porpuse'
        selectedOption={formData.porpuse}
        options={porpusesEnum}
        error={{ invalidFields, message: 'Porpuse field required' }}
      />

      <Space big />

      <Input
        label='¿Fumas?'
        placeholder=''
        type='radio'
        onChange={handleOnChange}
        name='smoke'
        selectedOption={formData.smoke}
        options={smokeEnum}
        error={{ invalidFields, message: 'Smoke field required' }}
      />

      <Space big />

      <Input
        label='¿Tomas alcohol?'
        placeholder=''
        type='radio'
        onChange={handleOnChange}
        name='alcohol'
        selectedOption={formData.alcohol}
        options={alcoholEnum}
        error={{ invalidFields, message: 'Alcohol field required' }}
      />

      <Space big />

      <Input
        label='¿Problemas de conducta alimentaria?'
        placeholder=''
        type='radio'
        onChange={handleOnChange}
        name='problems'
        selectedOption={formData.problems}
        options={problemsEnum}
        error={{ invalidFields, message: 'Eating behavior field required' }}
      />

      <Space big />

      <Input
        label='¿Patologías previas?'
        placeholder='Selecciona una o varias'
        isMultiSelect
        onChange={handleOnChange}
        name='patologies'
        selectedOption={formData.patologies}
        options={patologyEnum}
        error={{ invalidFields, message: 'Patologies field required' }}
      />

      <Space big />

      <Button type='submit' isPrimary big center>
        Finalizar
      </Button>

      <Space medium />
    </form>
  );
}

export default RegisterFormThree;
