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
import { useTranslation } from 'react-i18next';

function AdminNavBar() {
  const { t } = useTranslation();

  return (
    <nav>
      <ul className='nav-links'>
        <NavLink
          icon={faFlagCheckered}
          label={t('marathons')}
          route={frontRoutes.marathonList}
        />

        <NavLink
          icon={faCalendarDays}
          label={t('planning')}
          route={frontRoutes.planning}
        />

        <NavLink
          icon={faPlateWheat}
          label={t('recipes')}
          route={frontRoutes.dietsConfig}
        />

        <NavLink
          icon={faWheatAwn}
          label={t('ingredients')}
          route={frontRoutes.ingredients}
        />

        <NavLink
          icon={faDumbbell}
          label={t('workouts')}
          route={frontRoutes.workoutsConfig}
        />

        <NavLink
          icon={faSpa}
          label={t('meditations')}
          route={frontRoutes.meditationsConfig}
        />

        <NavLink
          icon={faListCheck}
          label={t('tasks')}
          route={frontRoutes.tasksConfig}
        />

        <NavLink icon={faUser} label={t('users')} route={frontRoutes.users} />

        <NavLink
          icon={faTools}
          label={t('config')}
          route={frontRoutes.config}
        />
      </ul>
    </nav>
  );
}

export default AdminNavBar;
