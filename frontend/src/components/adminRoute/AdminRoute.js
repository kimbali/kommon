import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminNavBar from '../navBar/AdminNavBar';

const AdminRoute = () => {
  const { userInfo } = useSelector(state => state.auth);

  return userInfo && userInfo.isAdmin ? (
    <div className='main-wrapper'>
      <AdminNavBar />

      <div className='main-content'>
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to='/login' replace />
  );
};
export default AdminRoute;
