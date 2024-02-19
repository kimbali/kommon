import { USER_INFO } from '../config/constants';

const getTokenFromLocalStorage = () => {
  const userInfo = localStorage.getItem(USER_INFO);

  return JSON.parse(userInfo)?.token;
};

export default getTokenFromLocalStorage;
