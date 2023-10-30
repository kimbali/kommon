import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Text from '../text/Text';

function NavLink({ icon, label, route, onClick }) {
  const location = useLocation();

  return (
    <li className={location.pathname.indexOf(route) >= 0 ? 'active' : ''}>
      <Link to={route} onClick={onClick}>
        <FontAwesomeIcon icon={icon} />

        <Text isSubtitle>{label}</Text>
      </Link>
    </li>
  );
}

export default NavLink;
