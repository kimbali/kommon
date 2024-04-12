import { USER_INFO } from '../config/constants';

const getTokenFromsessionStorage = () => {
  const userInfo = sessionStorage.getItem(USER_INFO);

  return JSON.parse(userInfo)?.token;
};

export default getTokenFromsessionStorage;
