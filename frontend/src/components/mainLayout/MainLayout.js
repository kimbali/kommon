import React from 'react';
import './mainLayout.scss';
import { Outlet } from 'react-router-dom';
import NavBar from '../navBar/NavBar';
import { BackButton } from '../backButton/BackButton';
import Languages from '../languages/Languages';

function MainLayout() {
  return (
    <div className='main-wrapper'>
      <NavBar />

      <div>
        <div className='content-left-and-right'>
          <BackButton />

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
