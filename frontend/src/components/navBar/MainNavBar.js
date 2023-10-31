import React from 'react';
import { faSpa } from '@fortawesome/free-solid-svg-icons';
import Space from '../space/Space';
import './navBar.scss';
import frontRoutes from '../../config/frontRoutes';
import NavLink from './NavLink';
import { useSelector } from 'react-redux';
import Button from '../button/Button';
import { useNavigate } from 'react-router-dom';
import CALENDAR from '../../styles/img/calendar.png';
import DIET from '../../styles/img/diet.png';
import DUMBBELL from '../../styles/img/dumbbell.png';
import MORE from '../../styles/img/more.png';

function MainNavBar({ showNav }) {
  const { userInfo } = useSelector(state => state.auth);

  const navigate = useNavigate();

  const handleGoToConfig = () => {
    navigate(frontRoutes.dietsConfig);
  };

  return (
    <nav className={`menu ${showNav ? 'show-nav' : 'hide-nav'}`}>
      <ul className='nav-links'>
        <NavLink image={CALENDAR} label='Main' route={frontRoutes.main} />

        <NavLink image={DIET} label='Diet' route={frontRoutes.diet} />

        <NavLink
          image={DUMBBELL}
          label='Workouts'
          route={frontRoutes.workouts}
        />

        <NavLink
          icon={faSpa}
          label='Meditations'
          route={frontRoutes.meditation}
        />

        <NavLink image={MORE} label='Progress' route={frontRoutes.progress} />
      </ul>

      {userInfo?.isAdmin && (
        <>
          <Button onClick={handleGoToConfig} isSecondary>
            Go to configuration
          </Button>

          <Space medium />
        </>
      )}
    </nav>
  );
}

export default MainNavBar;
