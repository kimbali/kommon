import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import LogoutButton from '../button/LogoutButton';

function UserMenu() {
  return (
    <div className='user-menu'>
      {/* <FontAwesomeIcon icon={faAngleDown} /> */}
      <LogoutButton />
    </div>
  );
}

export default UserMenu;
