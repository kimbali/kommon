import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminNavBar from '../navBar/AdminNavBar';
import LogoutButton from '../button/LogoutButton';

const AdminRoute = () => {
  const { userInfo } = useSelector(state => state.auth);

  return userInfo?.isAdmin ? (
    <div className='main-wrapper'>
      <AdminNavBar />

      <div>
        <div className='content-on-the-right'>
          <LogoutButton />

          {/* <Languages /> */}
        </div>

        <div className='main-content'>
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to='/login' replace />
  );
};
export default AdminRoute;
