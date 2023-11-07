import React from 'react';
import { useSelector } from 'react-redux';
import Text from '../components/text/Text';
import Button from '../components/button/Button';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

function CookiesFiles() {
  const { userInfo } = useSelector(state => state.auth);

  return (
    <div className='absolute-right'>
      <Text isTitle>Cookies files</Text>

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

export default CookiesFiles;
