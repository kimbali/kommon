import { PROGRESS_URL } from '../config/constants';
import { apiSlice } from './apiSlice';

export const progressesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProgresses: builder.query({
      query: params => ({
        url: PROGRESS_URL,
        params,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Progresses'],
    }),
    getProgressDetails: builder.query({
      query: progressId => ({
        url: `${PROGRESS_URL}/${progressId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createProgress: builder.mutation({
      query: data => ({
        url: `${PROGRESS_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Progress'],
    }),
    updateProgress: builder.mutation({
      query: data => {
        return {
          url: `${PROGRESS_URL}/${data._id}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['Progresses'],
    }),
    deleteProgress: builder.mutation({
      query: progressId => ({
        url: `${PROGRESS_URL}/${progressId}`,
        method: 'DELETE',
      }),
      providesTags: ['Progress'],
    }),
  }),
});

export const {
  useGetProgressesQuery,
  useGetProgressDetailsQuery,
  useCreateProgressMutation,
  useUpdateProgressMutation,
  useDeleteProgressMutation,
} = progressesApiSlice;
