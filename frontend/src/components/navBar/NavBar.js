import React from 'react';
import {
  faBarsProgress,
  faBowlFood,
  faDumbbell,
  faSpa,
  faUser,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import Text from '../text/Text';
import Space from '../space/Space';
import './navBar.scss';
import frontRoutes from '../../config/frontUrls';
import NavLink from './NavLink';

function NavBar() {
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
            icon={faSpa}
            label='To do list'
            route={frontRoutes.todoList}
          />
        </ul>
      </div>
      <Space small />
    </nav>
  );
}

export default NavBar;
