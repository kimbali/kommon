import React from 'react';
import {
  faDumbbell,
  faList,
  faSpa,
  faUser,
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
          <NavLink icon={faUser} label='Users' route={frontRoutes.users} />

          <NavLink
            icon={faUtensils}
            label='Recipes'
            route={frontRoutes.recipes}
          />

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
            icon={faList}
            label='To do list'
            route={frontRoutes.todoList}
          />
        </ul>
      </div>
      <Space small />
    </nav>
  );
}

export default AdminNavBar;
