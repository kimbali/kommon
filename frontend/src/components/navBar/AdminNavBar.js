import React from 'react';
import {
  faCalendarDays,
  faDumbbell,
  faFlagCheckered,
  faListCheck,
  faPlateWheat,
  faSpa,
  faTools,
  faUser,
  faWheatAwn,
} from '@fortawesome/free-solid-svg-icons';
import './navBar.scss';
import frontRoutes from '../../config/frontRoutes';
import NavLink from './NavLink';

function AdminNavBar() {
  return (
    <nav>
      <ul className='nav-links'>
        <NavLink
          icon={faFlagCheckered}
          label='Marathons'
          route={frontRoutes.marathonList}
        />

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
          icon={faWheatAwn}
          label='Ingredients'
          route={frontRoutes.ingredients}
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

        <NavLink icon={faTools} label='Config' route={frontRoutes.config} />
      </ul>
    </nav>
  );
}

export default AdminNavBar;
