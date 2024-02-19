import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AdminNavBar from '../navBar/AdminNavBar';
import TextedLogo from '../header/TextedLogo';
import UserMenu from '../header/UserMenu';
import RRSS from '../header/RRSS';
import Button from '../button/Button';
import Modal from '../modal/Modal';
import MENU from '../../styles/img/menu.png';
import { useUser } from '../../context/userContext';
import frontRoutes from '../../config/frontRoutes';
import { useMarathon } from '../../context/marathonContext';
import { getWeeksArray } from '../../utils/formatDate';
import { useDate } from '../../context/dateContext';

const AdminLayout = () => {
  const location = useLocation();

  const { user } = useUser();
  const { marathon } = useMarathon();
  const { setCurrentDay, setMonthArray, setCurrentDate } = useDate();

  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    if (marathon) {
      const month = getWeeksArray(marathon.startDate, marathon.endDate);

      setMonthArray(month);
      setCurrentDate(marathon.startDate);
      setCurrentDay({
        week: 1,
        weekDay: 0,
        planningId: marathon.planning._id,
      });
    }
  }, [marathon]);

  useEffect(() => {
    setShowNav(false);
  }, [location.pathname]);

  return user?.isAdmin ? (
    <div className='app-wrapper'>
      <header>
        <TextedLogo redirect={frontRoutes.marathonList} />

        <RRSS />

        <UserMenu />

        <Button onClick={() => setShowNav(!showNav)} className='breadcrumb'>
          <img src={MENU} alt='menu button' />
        </Button>
      </header>

      {window.innerWidth > 1023 ? (
        <AdminNavBar />
      ) : (
        showNav && (
          <Modal onClose={setShowNav} fullWidth>
            <AdminNavBar />
          </Modal>
        )
      )}

      <main>
        <Outlet />
      </main>
    </div>
  ) : (
    <Navigate to={frontRoutes.login} replace />
  );
};
export default AdminLayout;
