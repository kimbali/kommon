import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function UserMenu() {
  return (
    <div className='user-menu'>
      <FontAwesomeIcon icon={faAngleDown} />
    </div>
  );
}

export default UserMenu;
