import { MARATHON_URL } from '../config/constants';
import { apiSlice } from './apiSlice';

export const marathonsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getMarathons: builder.query({
      query: ({ keyword }) => ({
        url: MARATHON_URL,
        params: keyword ? { keyword } : null,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Marathons'],
    }),
    getMarathonDetails: builder.query({
      query: marathonId => ({
        url: `${MARATHON_URL}/${marathonId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createMarathon: builder.mutation({
      query: data => ({
        url: `${MARATHON_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Marathon'],
    }),
    updateMarathon: builder.mutation({
      query: data => {
        return {
          url: `${MARATHON_URL}/${data._id}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['Marathons'],
    }),
    deleteMarathon: builder.mutation({
      query: marathonId => ({
        url: `${MARATHON_URL}/${marathonId}`,
        method: 'DELETE',
      }),
      providesTags: ['Marathon'],
    }),
  }),
});

export const {
  useGetMarathonsQuery,
  useGetMarathonDetailsQuery,
  useCreateMarathonMutation,
  useUpdateMarathonMutation,
  useDeleteMarathonMutation,
} = marathonsApiSlice;