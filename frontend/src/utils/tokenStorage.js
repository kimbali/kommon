import { USER_INFO } from '../config/constants';

const getTokenFromlocalStorage = () => {
  const userInfo = localStorage.getItem(USER_INFO);

  return JSON.parse(userInfo)?.token;
};

export default getTokenFromlocalStorage;
