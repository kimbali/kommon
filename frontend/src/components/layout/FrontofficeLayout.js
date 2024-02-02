import React, { useEffect, useState } from 'react';
import './layout.scss';
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { useGetMarathonDetailsForClientQuery } from '../../slices/marathonApiSlice';
import { useGetMonthDayDetailsQuery } from '../../slices/daysApiSlice';
import { useMarathon } from '../../context/marathonContext';
import MainNavBar from '../navBar/MainNavBar';
import TextedLogo from '../header/TextedLogo';
import UserMenu from '../header/UserMenu';
import RRSS from '../header/RRSS';
import Button from '../button/Button';
import MENU from '../../styles/img/menu.png';
import Modal from '../modal/Modal';
import Space from '../space/Space';
import { useGetProgressDetailsQuery } from '../../slices/progressApiSlice';
import { useProgress } from '../../context/progressContext';
import {
  getDatePositionInMonthArray,
  getWeeksArray,
} from '../../utils/formatDate';
import { useUser } from '../../context/userContext';
import { useDate } from '../../context/dateContext';
import frontRoutes from '../../config/frontRoutes';

function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useUser();
  const { marathonId, setDayDetails, updateMarathon } = useMarathon();
  const {
    currentDay,
    setCurrentDay,
    setMonthArray,
    setCurrentDate,
    currentDate,
  } = useDate();

  const [showNav, setShowNav] = useState(false);

  const { data: marathonData } = useGetMarathonDetailsForClientQuery(
    marathonId,
    {
      skip: !marathonId,
    }
  );

  const { data: dayData, isError } = useGetMonthDayDetailsQuery(currentDay, {
    skip: !currentDay,
  });

  useEffect(() => {
    if (marathonData) {
      updateMarathon(marathonData);

      const month = getWeeksArray(marathonData.startDate, marathonData.endDate);
      const todayPos = getDatePositionInMonthArray(
        month,
        currentDate || new Date()
      );

      // //TODO: Abilitar cuando funcione todo
      // if (!user?.isAdmin && !todayPos.week && !todayPos.weekDay) {
      //   navigate(frontRoutes.profileMarathons);
      // }

      setMonthArray(month);
      setCurrentDate(currentDate || new Date());
      setCurrentDay({
        week: todayPos.week,
        weekDay: todayPos.weekDay,
        planningId: marathonData.planning._id,
      });
    }
  }, [marathonData]);

  useEffect(() => {
    if (dayData) {
      setDayDetails(dayData);
    }
    if (isError) {
      setDayDetails(null);
    }
  }, [dayData, isError]);

  useEffect(() => {
    setShowNav(false);
  }, [location.pathname]);

  return (
    <div className='app-wrapper'>
      <header>
        <TextedLogo />

        <RRSS />

        <UserMenu />

        <Button onClick={() => setShowNav(!showNav)} className='breadcrumb'>
          <img src={MENU} alt='menu button' />
        </Button>
      </header>

      {window.innerWidth > 1023 ? (
        <MainNavBar />
      ) : (
        showNav && (
          <Modal onClose={setShowNav} fullWidth>
            <MainNavBar />
          </Modal>
        )
      )}

      <main>
        <Outlet context={[isError]} />
      </main>

      <Space big />
    </div>
  );
}

export default MainLayout;
