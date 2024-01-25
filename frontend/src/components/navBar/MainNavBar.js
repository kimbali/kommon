import React from 'react';
import Space from '../space/Space';
import './navBar.scss';
import frontRoutes from '../../config/frontRoutes';
import NavLink from './NavLink';
import Button from '../button/Button';
import { useNavigate } from 'react-router-dom';
import CALENDAR from '../../styles/img/calendar.png';
import DIET from '../../styles/img/diet.png';
import DUMBBELL from '../../styles/img/dumbbell.png';
import PROGRESS from '../../styles/img/weighing-scale.png';
import MORE from '../../styles/img/more.png';
import { useUser } from '../../context/userContext';
import { useTranslation } from 'react-i18next';

function MainNavBar({ showNav }) {
  const { t } = useTranslation();
  const { user } = useUser();

  const navigate = useNavigate();

  const handleGoToConfig = () => {
    navigate(frontRoutes.planning);
  };

  return (
    <nav className={`menu ${showNav ? 'show-nav' : 'hide-nav'}`}>
      {user?.isAdmin && (
        <>
          <Button onClick={handleGoToConfig} isSecondary>
            {t('goToConfig')}
          </Button>

          <Space medium />
        </>
      )}

      <ul className='nav-links'>
        <NavLink image={CALENDAR} label={t('main')} route={frontRoutes.main} />

        <NavLink image={DIET} label={t('diet')} route={frontRoutes.diet} />

        <NavLink
          image={DUMBBELL}
          label={t('workouts')}
          route={frontRoutes.workouts}
        />

        <NavLink
          image={PROGRESS}
          label={t('progress')}
          route={frontRoutes.progress}
        />

        <NavLink image={MORE} label={t('more')} route={frontRoutes.more} />
      </ul>
    </nav>
  );
}

export default MainNavBar;
