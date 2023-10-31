import React from 'react';
import {
  faCalendarDays,
  faDumbbell,
  faListCheck,
  faPlateWheat,
  faSpa,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import './navBar.scss';
import frontRoutes from '../../config/frontRoutes';
import NavLink from './NavLink';
import Button from '../button/Button';
import { useNavigate } from 'react-router-dom';

function AdminNavBar() {
  const navigate = useNavigate();

  const handleGoToMarathon = () => {
    navigate(frontRoutes.main);
  };

  return (
    <nav>
      <ul className='nav-links'>
        <NavLink
          icon={faCalendarDays}
          label='Planning'
          route={frontRoutes.planning}
        />

        <NavLink
          icon={faPlateWheat}
          label='Recipes'
          route={frontRoutes.dietsConfig}
        />

        <NavLink
          icon={faDumbbell}
          label='Workouts'
          route={frontRoutes.workoutsConfig}
        />

        <NavLink
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

      <Button onClick={handleGoToMarathon} isSecondary>
        Go to live
      </Button>
    </nav>
  );
}

export default AdminNavBar;
