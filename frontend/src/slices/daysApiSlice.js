import { DAYS_URL } from '../config/constants';
import { apiSlice } from './apiSlice';

export const daysApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getDays: builder.query({
      query: ({ keyword }) => ({
        url: DAYS_URL,
        params: keyword ? { keyword } : null,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Days'],
    }),
    getDayDetails: builder.query({
      query: dayId => ({
        url: `${DAYS_URL}/${dayId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createDay: builder.mutation({
      query: data => ({
        url: `${DAYS_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Day'],
    }),
    updateDay: builder.mutation({
      query: ({ data, dayId }) => {
        return {
          url: `${DAYS_URL}/${dayId}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['Days'],
    }),
    deleteDay: builder.mutation({
      query: dayId => ({
        url: `${DAYS_URL}/${dayId}`,
        method: 'DELETE',
      }),
      providesTags: ['Day'],
    }),
    getDayDietDetails: builder.query({
      query: diet => ({
        url: `${DAYS_URL}/diet/${diet}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetDaysQuery,
  useGetDayDetailsQuery,
  useCreateDayMutation,
  useUpdateDayMutation,
  useDeleteDayMutation,
  useGetDayDietDetailsQuery,
} = daysApiSlice;
