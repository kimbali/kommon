import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../slices/usersApiSlices';
import { logout } from '../../slices/authSlice';
import Button from './Button';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import frontRoutes from '../../config/frontRoutes';
import { useUser } from '../../context/userContext';

function LogoutButton() {
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

  return (
    <Button
      isPrimary
      small
      onClick={handleLogout}
      iconRight={faArrowRightFromBracket}
    >
      Log out
    </Button>
  );
}

export default LogoutButton;
