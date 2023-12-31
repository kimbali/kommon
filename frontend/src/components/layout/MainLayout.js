import React, { useEffect, useState } from 'react';
import './layout.scss';
import { Outlet, useLocation, useSearchParams } from 'react-router-dom';
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
import { DATE } from '../../config/constants';

function MainLayout() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { marathonId, setDayDetails, updateMarathon } = useMarathon();
  const { progressId, updateUserProgress } = useProgress();
  const { user } = useUser();

  const [currentDay, setCurrentDay] = useState();
  const [showNav, setShowNav] = useState(false);

  const { data: progressData } = useGetProgressDetailsQuery(progressId, {
    skip: !progressId,
  });

  const { data: marathonData } = useGetMarathonDetailsForClientQuery(
    marathonId,
    {
      skip: !marathonId,
    }
  );

  const { data: dayData, isError } = useGetMonthDayDetailsQuery(currentDay, {
    skip: !currentDay,
  });

  const handleSelectDay = day => {
    setCurrentDay({ ...day, planningId: marathonData?.planning._id });
  };

  useEffect(() => {
    if (progressData) {
      updateUserProgress(progressData);
    }
  }, [progressData]);

  useEffect(() => {
    if (marathonData) {
      const urlDate = searchParams.get(DATE);
      updateMarathon(marathonData);

      const month = getWeeksArray(marathonData.startDate, marathonData.endDate);
      const todayPos = getDatePositionInMonthArray(month, new Date(urlDate));

      handleSelectDay({
        week: !user.isAdmin && todayPos.week ? todayPos.week : 1,
        weekDay: !user.isAdmin && todayPos.weekDay ? todayPos.weekDay : 0,
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
        <Outlet context={[handleSelectDay, isError]} />
      </main>

      <Space big />
    </div>
  );
}

export default MainLayout;
