import React from 'react';
import Text from '../components/text/Text';
import { useSelector } from 'react-redux';
import Button from '../components/button/Button';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

function PrivacyPolicy() {
  const { userInfo } = useSelector(state => state.auth);

  return (
    <div className='absolute-right'>
      <Text isTitle>Privacy policy</Text>

      {userInfo.isAdmin && (
        <div className='absolute-right-element'>
          <Button isPrimary iconLeft={faEdit} className='edit-button'>
            Modificar texto
          </Button>
        </div>
      )}
    </div>
  );
}

export default PrivacyPolicy;
