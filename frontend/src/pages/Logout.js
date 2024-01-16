import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext';
import { useLogoutMutation } from '../slices/usersApiSlices';
import frontRoutes from '../config/frontRoutes';
import { useTranslation } from 'react-i18next';

function Logout() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { updateUser } = useUser();

  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());

      updateUser(null);
      navigate(frontRoutes.login);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return <div>BYE BYE</div>;
}

export default Logout;
