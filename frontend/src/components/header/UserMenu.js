import React, { useEffect, useState } from 'react';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Button from '../button/Button';

import MenuLinks from './MenuLinks';
import { useLocation } from 'react-router-dom';

function UserMenu() {
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
      <Button iconLeft={faAngleDown} onClick={handleMenu} />

      {showMenu && <MenuLinks />}
    </div>
  );
}

export default UserMenu;
