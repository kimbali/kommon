import React, { useState } from 'react';
import Button from '../button/Button';
import Text from '../text/Text';
import Space from '../space/Space';
import Input from '../input/Input';
import { useRegisterMutation } from '../../slices/usersApiSlices';
import { setCredentials } from '../../slices/authSlice';
import { useDispatch } from 'react-redux';

function NewUser({ onCreate, onCancel }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');

  const handleOnChange = ({ name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const [register] = useRegisterMutation();

  const handleSubmit = async e => {
    e.preventDefault();
    setError(false);

    if (!formData.email || !formData.password) {
      return setError(true);
    }

    const res = await register({
      email: formData.email,
      password: formData.password,
    }).unwrap();

    dispatch(setCredentials({ ...res }));
    // navigate(redirect);
    onCreate();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Text isTitle>Create new user</Text>

      <Space small />

      <div className='grid-container'>
        <Input
          className='cols-2'
          label='email'
          name='email'
          placeholder='hello@bodymarathon.com'
          onChange={handleOnChange}
          value={formData.email}
        />

        <Input
          className='cols-2'
          label='password'
          name='password'
          placeholder='*****'
          onChange={handleOnChange}
          value={formData.password}
        />
      </div>

      {error && <Text danger>Email and password requireds</Text>}

      <Space big />

      <div className='content-on-the-right'>
        <div className='buttons-container'>
          <Button onClick={onCancel} isSecondary>
            Cancel
          </Button>

          <Button type='submit' isPrimary>
            Create user
          </Button>
        </div>
      </div>
    </form>
  );
}

export default NewUser;
