import { createSlice } from '@reduxjs/toolkit';
import { EXPIRATION_TIME, USER_INFO } from '../config/constants';

const initialState = {
  userInfo: localStorage.getItem(USER_INFO)
    ? JSON.parse(localStorage.getItem(USER_INFO))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem(USER_INFO, JSON.stringify(action.payload));

      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days
      localStorage.setItem(EXPIRATION_TIME, expirationTime);
    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
