import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminNavBar from '../navBar/AdminNavBar';
import TextedLogo from '../header/TextedLogo';
import UserMenu from '../header/UserMenu';
import RRSS from '../header/RRSS';
import Button from '../button/Button';
import Modal from '../modal/Modal';
import MENU from '../../styles/img/menu.png';
import { useUser } from '../../context/userContext';

const AdminLayout = () => {
  const [showNav, setShowNav] = useState(false);
  const { user } = useUser();

  const location = useLocation();

  useEffect(() => {
    setShowNav(false);
  }, [location.pathname]);

  return user?.isAdmin ? (
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
    <Navigate to='/login' replace />
  );
};
export default AdminLayout;
