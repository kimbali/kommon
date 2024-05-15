import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../config/constants';
import getTokenFromlocalStorage from '../utils/tokenStorage';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getTokenFromlocalStorage();

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [
    'Recipe',
    'Ingredient',
    'Measure',
    'Workout',
    'Meditation',
    'Task',
    'Image',
  ],
  endpoints: builder => ({}),
});
