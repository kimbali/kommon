import React, { useState } from 'react';
import Button from '../button/Button';
import Text from '../text/Text';
import Space from '../space/Space';
import Input from '../input/Input';
import { useRegisterMutation } from '../../slices/usersApiSlices';
import yesNoEnum from '../../config/enums/yesNoEnum';
import toast from 'react-hot-toast';

function NewUser({ onCreate, onCancel, user }) {
  const [formData, setFormData] = useState({ ...user });
  const [invalidFields, setInvalidFields] = useState([]);

  const handleOnChange = ({ name, value: valueProp }) => {
    let value = valueProp;
    if (name === 'isAdmin' || name === 'hasPaid') {
      value = valueProp === 'NO' ? false : true;
    }
    setFormData({ ...formData, [name]: value });
  };

  const [register] = useRegisterMutation();

  const handleSubmit = async e => {
    e.preventDefault();
    setInvalidFields([]);

    if (!formData.email) {
      return setInvalidFields(['email']);
    }

    if (!formData.password) {
      return setInvalidFields(['password']);
    }

    try {
      await register({ ...formData, createdByAdmin: true }).unwrap();

      toast.success('Usuario creado con exito');
    } catch (err) {
      toast.error(err.message);
    }

    onCreate();
  };

  return (
    <form onSubmit={handleSubmit} className='new-user-form'>
      <Text isTitle>Create new user</Text>

      <Space small />

      <Input
        label='email'
        name='email'
        placeholder='hola@bodymaraton.com'
        onChange={handleOnChange}
        value={formData.email}
        error={{ invalidFields, message: 'Email field required' }}
      />

      <Space small />

      <Input
        label='nombre'
        name='name'
        placeholder='nombre usuario'
        onChange={handleOnChange}
        value={formData.name}
      />

      <Space small />

      <Input
        label='password'
        name='password'
        placeholder='*****'
        onChange={handleOnChange}
        value={formData.password}
        error={{ invalidFields, message: 'Password field required' }}
      />

      <Space small />

      <Input
        label='¿Usuario administrador?'
        placeholder=''
        type='radio'
        onChange={handleOnChange}
        name='isAdmin'
        selectedOption={formData.isAdmin ? 'YES' : 'NO'}
        options={yesNoEnum}
      />

      <Space small />

      <Input
        label='¿Ha pagado?'
        placeholder=''
        type='radio'
        onChange={handleOnChange}
        name='hasPaid'
        selectedOption={formData.hasPaid ? 'YES' : 'NO'}
        options={yesNoEnum}
      />

      <Space big />

      <div className='content-on-the-right'>
        <Button onClick={onCancel} isSecondary>
          Cancel
        </Button>

        <Button type='submit' isPrimary>
          Create user
        </Button>
      </div>
    </form>
  );
}

export default NewUser;
