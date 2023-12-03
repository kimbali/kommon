import React, { useEffect, useState } from 'react';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Button from '../button/Button';

import MenuLinks from './MenuLinks';
import { useLocation } from 'react-router-dom';
import { useUser } from '../../context/userContext';

function UserMenu() {
  const { user } = useUser();
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  const handleMenu = () => {
    setShowMenu(prev => !prev);
  };

  useEffect(() => {
    setShowMenu(false);
  }, [location.pathname]);

  return (
    <div className='user-menu'>
      <Button
        className='menu-button'
        iconRight={faAngleDown}
        onClick={handleMenu}
      >
        {user?.name}
      </Button>

      {showMenu && <MenuLinks />}
    </div>
  );
}

export default UserMenu;
