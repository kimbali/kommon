import React from 'react';
import {
  faCalendarWeek,
  faDumbbell,
  faPlateWheat,
  faSpa,
  faWeightScale,
} from '@fortawesome/free-solid-svg-icons';
import Text from '../text/Text';
import Space from '../space/Space';
import './navBar.scss';
import frontRoutes from '../../config/frontRoutes';
import NavLink from './NavLink';
import { useSelector } from 'react-redux';
import Button from '../button/Button';
import { useNavigate } from 'react-router-dom';

function MainNavBar() {
  const { userInfo } = useSelector(state => state.auth);

  const navigate = useNavigate();
  const handleGoToConfig = () => {
    navigate(frontRoutes.dietsConfig);
  };

  return (
    <nav className='menu'>
      <div className='menu-top'>
        <Text isTitle>Body marathon</Text>

        <Space small />

        {userInfo?.isAdmin && (
          <>
            <Button onClick={handleGoToConfig} isSecondary>
              Go to configuration
            </Button>

            <Space medium />
          </>
        )}

        <ul className='nav-bar'>
          <NavLink
            icon={faCalendarWeek}
            label='Main'
            route={frontRoutes.main}
          />

          <NavLink icon={faPlateWheat} label='Diet' route={frontRoutes.diet} />

          <NavLink
            icon={faDumbbell}
            label='Workouts'
            route={frontRoutes.workouts}
          />

          <NavLink
            icon={faSpa}
            label='Meditations'
            route={frontRoutes.meditation}
          />

          <NavLink
            icon={faWeightScale}
            label='Progress'
            route={frontRoutes.progress}
          />
        </ul>
      </div>
    </nav>
  );
}

export default MainNavBar;
