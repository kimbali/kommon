import { createSlice } from '@reduxjs/toolkit';
import { EXPIRATION_TIME, USER_INFO } from '../config/constants';

const initialState = {
  userInfo: sessionStorage.getItem(USER_INFO)
    ? JSON.parse(sessionStorage.getItem(USER_INFO))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      sessionStorage.setItem(USER_INFO, JSON.stringify(action.payload));

      const expirationTime = new Date().getTime() + 35 * 24 * 60 * 60 * 1000; // 35 days
      sessionStorage.setItem(EXPIRATION_TIME, expirationTime);
    },
    logout: (state, action) => {
      state.userInfo = null;
      sessionStorage.clear();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
