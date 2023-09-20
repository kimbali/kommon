import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-hot-toast';
import {
  faCopy,
  faList,
  faQrcode,
  faSquareH,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import Text from '../text/Text';
import Logo from '../logo/Logo';
import Space, { size } from '../space/Space';
import './navBar.scss';

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className='menu'>
      <div className='menu-top'>
        <Logo width='48px' />

        <Space small />

        <Text isTitle>Body marathon</Text>

        <Space medium />

        <ul>
          <li
            className={
              location.pathname.indexOf(`/recipes`) >= 0 ? 'active' : ''
            }
          >
            <Link to={`/recipes`}>
              <Text isCTA>
                <FontAwesomeIcon icon={faUtensils} />
                <span className='hide-in-mobile'>Recipes</span>
              </Text>
            </Link>
          </li>
        </ul>
      </div>
      <Space small />
    </nav>
  );
}

export default NavBar;
