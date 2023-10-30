import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminNavBar from '../navBar/AdminNavBar';
import TextedLogo from '../header/TextedLogo';
import UserMenu from '../header/UserMenu';
import RRSS from '../header/RRSS';
import Button from '../button/Button';
import Modal from '../modal/Modal';
import { useState } from 'react';
import isDesktop from '../../utils/layoutHelpers';

const AdminLayout = () => {
  const [showNav, setShowNav] = useState(false);
  const { userInfo } = useSelector(state => state.auth);

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

      {isDesktop ? (
        <AdminNavBar />
      ) : (
        <Modal onClose={setShowNav}>
          <AdminNavBar setShowNav={setShowNav} />
        </Modal>
      )}

      <main>
        <Outlet />
      </main>

      <footer>Footer</footer>
    </div>
  ) : (
    <Navigate to='/login' replace />
  );
};
export default AdminLayout;
