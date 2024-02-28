import React, { useEffect, useState } from 'react';
import './layout.scss';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
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
import {
  getDatePositionInMonthArray,
  getWeeksArray,
} from '../../utils/formatDate';
import { useDate } from '../../context/dateContext';
import frontRoutes from '../../config/frontRoutes';
import { useProgress } from '../../context/progressContext';
import { useUser } from '../../context/userContext';

function MainLayout() {
  const location = useLocation();
  const { user } = useUser();
  const { userProgress } = useProgress();
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
    marathonId || user?.progresses[user.progresses.length - 1].marathon._id,
    {
      skip: !user,
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
        <TextedLogo redirect={frontRoutes.main} />

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
