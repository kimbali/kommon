import { EMAIL_URL } from '../config/constants';
import { apiSlice } from './apiSlice';

export const emailApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    sendEmail: builder.mutation({
      query: data => ({
        url: `${EMAIL_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Email'],
    }),
  }),
});

export const { useSendEmailMutation } = emailApiSlice;
