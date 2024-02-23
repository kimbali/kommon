import React from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Text from '../text/Text';
import downloadPDF from '../../utils/downloadPDF';
import { useTranslation } from 'react-i18next';

function NavLink({ icon, label, route, onClick, image, downloadLink }) {
  const { t } = useTranslation();
  const location = useLocation();

  const handleDownload = () => {
    downloadPDF(downloadLink);
    toast.success(t('downloaded'));
  };

  return (
    <li className={location.pathname.indexOf(route) >= 0 ? 'active' : ''}>
      {!downloadLink && (
        <Link to={route} onClick={onClick}>
          <div className='nav-icon'>
            {icon && <FontAwesomeIcon icon={icon} />}

            {image && <img src={image} alt={label} />}
          </div>

          <Text isSubtitle>{label}</Text>
        </Link>
      )}

      {downloadLink && (
        <button onClick={handleDownload}>
          <div className='nav-icon'>
            {icon && <FontAwesomeIcon icon={icon} />}

            {image && <img src={image} alt={label} />}
          </div>

          <Text isSubtitle>{label}</Text>
        </button>
      )}
    </li>
  );
}

export default NavLink;
