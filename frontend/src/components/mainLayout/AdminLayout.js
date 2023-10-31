import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminNavBar from '../navBar/AdminNavBar';
import TextedLogo from '../header/TextedLogo';
import UserMenu from '../header/UserMenu';
import RRSS from '../header/RRSS';
import Button from '../button/Button';
import Modal from '../modal/Modal';

const AdminLayout = () => {
  const [showNav, setShowNav] = useState(false);
  const { userInfo } = useSelector(state => state.auth);

  const location = useLocation();

  useEffect(() => {
    setShowNav(false);
  }, [location.pathname]);

  return userInfo?.isAdmin ? (
    <div className='app-wrapper'>
      <header>
        <TextedLogo />

        <RRSS />

        <UserMenu />

        <Button onClick={() => setShowNav(!showNav)} className='breadcrumb'>
          X
        </Button>
      </header>

      {window.innerWidth > 1023 ? (
        <AdminNavBar />
      ) : (
        <Modal onClose={setShowNav}>
          <AdminNavBar />
        </Modal>
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
