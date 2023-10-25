import React from 'react';
import './mainLayout.scss';
import { Outlet } from 'react-router-dom';
import MainNavBar from '../navBar/MainNavBar';
import LogoutButton from '../button/LogoutButton';

function MainLayout() {
  return (
    <div className='main-wrapper'>
      <MainNavBar />

      <div className='main-content'>
        <div className='content-on-the-right'>
          <LogoutButton />
        </div>

        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
