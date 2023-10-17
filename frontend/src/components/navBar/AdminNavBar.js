import React from 'react';
import {
  faCalendarDays,
  faDumbbell,
  faListCheck,
  faPlateWheat,
  faSpa,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import Text from '../text/Text';
import Space from '../space/Space';
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
    <nav className='menu'>
      <div className='menu-top'>
        <Text isTitle>Body marathon </Text>
        <Text isSubtitle>configuration</Text>

        <Space small />

        <Button onClick={handleGoToMarathon} isSecondary>
          Go to marathon
        </Button>

        <Space medium />

        <ul className='nav-bar'>
          <NavLink
            icon={faCalendarDays}
            label='Planning'
            route={frontRoutes.planning}
          />

          <NavLink
            icon={faPlateWheat}
            label='Diets'
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
      </div>
      <Space small />
    </nav>
  );
}

export default AdminNavBar;
