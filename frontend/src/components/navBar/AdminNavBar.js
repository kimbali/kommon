import React from 'react';
import {
  faCalendarDays,
  faDumbbell,
  faListCheck,
  faPlateWheat,
  faSpa,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import Space from '../space/Space';
import './navBar.scss';
import frontRoutes from '../../config/frontRoutes';
import NavLink from './NavLink';
import Button from '../button/Button';
import { useNavigate } from 'react-router-dom';

function AdminNavBar({ setShowNav }) {
  const navigate = useNavigate();

  const handleGoToMarathon = () => {
    navigate(frontRoutes.main);
  };

  const handleHideNav = () => {
    setShowNav(false);
  };

  return (
    <nav>
      <Button onClick={handleGoToMarathon} isSecondary>
        Go to live KIM
      </Button>

      <Space medium />

      <ul className='nav-bar'>
        <NavLink
          onClick={handleHideNav}
          icon={faCalendarDays}
          label='Planning'
          route={frontRoutes.planning}
        />

        <NavLink
          onClick={handleHideNav}
          icon={faPlateWheat}
          label='Recipes'
          route={frontRoutes.dietsConfig}
        />

        <NavLink
          onClick={handleHideNav}
          icon={faDumbbell}
          label='Workouts'
          route={frontRoutes.workoutsConfig}
        />

        <NavLink
          onClick={handleHideNav}
          icon={faSpa}
          label='Meditations'
          route={frontRoutes.meditationsConfig}
        />

        <NavLink
          icon={faListCheck}
          label='Tasks'
          route={frontRoutes.tasksConfig}
        />

        <NavLink icon={faUser} label='Users' route={frontRoutes.users} />
      </ul>
    </nav>
  );
}

export default AdminNavBar;
