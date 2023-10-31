import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Text from '../text/Text';

function NavLink({ icon, label, route, onClick, image }) {
  const location = useLocation();

  return (
    <li className={location.pathname.indexOf(route) >= 0 ? 'active' : ''}>
      <Link to={route} onClick={onClick}>
        <div className='nav-icon'>
          {icon && <FontAwesomeIcon icon={icon} />}

          {image && <img src={image} alt={label} />}
        </div>

        <Text isSubtitle>{label}</Text>
      </Link>
    </li>
  );
}

export default NavLink;
