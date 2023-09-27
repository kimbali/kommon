import React from 'react';
import {
  faBarsProgress,
  faCalendar,
  faCalendarWeek,
  faDumbbell,
  faPlateWheat,
  faRankingStar,
  faSpa,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import Text from '../text/Text';
import Space from '../space/Space';
import './navBar.scss';
import frontRoutes from '../../config/frontRoutes';
import NavLink from './NavLink';

function AdminNavBar() {
  return (
    <nav className='menu'>
      <div className='menu-top'>
        <Text isTitle>Body marathon</Text>

        <Space medium />

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
            icon={faRankingStar}
            label='Progress'
            route={frontRoutes.progress}
          />
        </ul>
      </div>
      <Space small />
    </nav>
  );
}

export default AdminNavBar;
