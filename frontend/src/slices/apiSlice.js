import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../config/constants';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

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
