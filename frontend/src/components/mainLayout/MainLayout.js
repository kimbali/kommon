import React, { useState } from 'react';
import './mainLayout.scss';
import { Outlet } from 'react-router-dom';
import MainNavBar from '../navBar/MainNavBar';
import TextedLogo from '../header/TextedLogo';
import UserMenu from '../header/UserMenu';
import RRSS from '../header/RRSS';
import Button from '../button/Button';

function MainLayout() {
  const [showNav, setShowNav] = useState(false);

  return (
    <div className='app-wrapper'>
      <header>
        <TextedLogo />

        <RRSS />

        <UserMenu />

        <Button onClick={() => setShowNav(!showNav)} className='breadcrumb'>
          X
        </Button>
      </header>

      <MainNavBar showNav={showNav} setShowNav={setShowNav} />

      <main>
        <Outlet />
      </main>

      <footer>marathon.com All rights reserved © 2022</footer>
    </div>
  );
}

export default MainLayout;
