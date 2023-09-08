import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-hot-toast';
import {
  faCopy,
  faList,
  faQrcode,
  faSquareH,
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

        <Space size={size.SMALL} />

        <Text isTitle>Body marathon</Text>

        <Space size={size.MEDIUM} />

        <ul>
          <li className={location.pathname.indexOf(`/`) >= 0 ? 'active' : ''}>
            <Link to={`/`}>
              <Text isCTA>
                <FontAwesomeIcon icon={faList} />
                <span className='hide-in-mobile'>Lista</span>
              </Text>
            </Link>
          </li>
        </ul>
      </div>
      <Space size={size.SMALL} />
    </nav>
  );
}

export default NavBar;
