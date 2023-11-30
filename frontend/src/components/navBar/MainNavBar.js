import React from 'react';
import { faSpa } from '@fortawesome/free-solid-svg-icons';
import Space from '../space/Space';
import './navBar.scss';
import frontRoutes from '../../config/frontRoutes';
import NavLink from './NavLink';
import Button from '../button/Button';
import { useNavigate } from 'react-router-dom';
import CALENDAR from '../../styles/img/calendar.png';
import DIET from '../../styles/img/diet.png';
import DUMBBELL from '../../styles/img/dumbbell.png';
import PROGRESS from '../../styles/img/weighing-scale.png';
import MORE from '../../styles/img/more.png';
import { useUser } from '../../context/userContext';

function MainNavBar({ showNav }) {
  const { user } = useUser();

  const navigate = useNavigate();

  const handleGoToConfig = () => {
    navigate(frontRoutes.planning);
  };

  return (
    <nav className={`menu ${showNav ? 'show-nav' : 'hide-nav'}`}>
      {user?.isAdmin && (
        <>
          <Button onClick={handleGoToConfig} isSecondary>
            Go to configuration
          </Button>

          <Space medium />
        </>
      )}

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
          route={frontRoutes.meditations}
        />

        <NavLink
          image={PROGRESS}
          label='Progress'
          route={frontRoutes.progress}
        />

        <NavLink image={MORE} label='More' route={frontRoutes.more} />
      </ul>
    </nav>
  );
}

export default MainNavBar;
