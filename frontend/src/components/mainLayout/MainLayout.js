import React from 'react';
import './mainLayout.scss';
import { Outlet } from 'react-router-dom';
import MainNavBar from '../navBar/MainNavBar';
import Languages from '../languages/Languages';

function MainLayout() {
  return (
    <div className='main-wrapper'>
      <MainNavBar />

      <div>
        <div className='content-on-the-right'>
          <Languages />
        </div>

        <div className='main-content'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
