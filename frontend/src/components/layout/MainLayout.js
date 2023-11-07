import React, { useEffect, useState } from 'react';
import './layout.scss';
import { Outlet, useLocation } from 'react-router-dom';
import MainNavBar from '../navBar/MainNavBar';
import TextedLogo from '../header/TextedLogo';
import UserMenu from '../header/UserMenu';
import RRSS from '../header/RRSS';
import Button from '../button/Button';
import MENU from '../../styles/img/menu.png';
import Modal from '../modal/Modal';

function MainLayout() {
  const [showNav, setShowNav] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setShowNav(false);
  }, [location.pathname]);

  return (
    <div className='app-wrapper'>
      <header>
        <TextedLogo />

        <RRSS />

        <UserMenu />

        <Button onClick={() => setShowNav(!showNav)} className='breadcrumb'>
          <img src={MENU} alt='menu button' />
        </Button>
      </header>

      {window.innerWidth > 1023 ? (
        <MainNavBar />
      ) : (
        showNav && (
          <Modal onClose={setShowNav} fullWidth>
            <MainNavBar />
          </Modal>
        )
      )}

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
