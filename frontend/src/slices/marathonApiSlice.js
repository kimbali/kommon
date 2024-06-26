import { MARATHON_URL } from '../config/constants';
import { apiSlice } from './apiSlice';

export const marathonsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getMarathons: builder.query({
      query: params => ({
        url: MARATHON_URL,
        params,
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
    updateParticipants: builder.mutation({
      query: marathonId => {
        return {
          url: `${MARATHON_URL}/participants/${marathonId}`,
          method: 'PUT',
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
    getMarathonDetailsForClient: builder.query({
      query: marathonId => ({
        url: `${MARATHON_URL}/client/${marathonId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getShoppingList: builder.query({
      query: ({ marathonId, week }) => ({
        url: `${MARATHON_URL}/shopping-list/${marathonId}/${week}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetMarathonsQuery,
  useGetMarathonDetailsQuery,
  useCreateMarathonMutation,
  useUpdateMarathonMutation,
  useUpdateParticipantsMutation,
  useDeleteMarathonMutation,
  useGetMarathonDetailsForClientQuery,
  useGetShoppingListQuery,
} = marathonsApiSlice;
