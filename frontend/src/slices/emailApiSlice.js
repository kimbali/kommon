import { EMAIL_URL } from '../config/constants';
import { apiSlice } from './apiSlice';

export const emailApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getEmail: builder.query({
      query: () => ({
        url: `${EMAIL_URL}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Email'],
    }),
  }),
});

export const { useGetEmailQuery } = emailApiSlice;
