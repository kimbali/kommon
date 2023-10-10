import { MEDITATIONS_URL } from '../config/constants';
import { apiSlice } from './apiSlice';

export const meditationsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getMeditations: builder.query({
      query: ({ keyword }) => ({
        url: MEDITATIONS_URL,
        params: { keyword },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Meditations'],
    }),
    getMeditationDetails: builder.query({
      query: meditationId => ({
        url: `${MEDITATIONS_URL}/${meditationId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createMeditation: builder.mutation({
      query: data => ({
        url: `${MEDITATIONS_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Meditation'],
    }),
    updateMeditation: builder.mutation({
      query: data => ({
        url: `${MEDITATIONS_URL}/${data.meditationId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Meditations'],
    }),
    deleteMeditation: builder.mutation({
      query: meditationId => ({
        url: `${MEDITATIONS_URL}/${meditationId}`,
        method: 'DELETE',
      }),
      providesTags: ['Meditation'],
    }),
  }),
});

export const {
  useGetMeditationsQuery,
  useGetMeditationDetailsQuery,
  useCreateMeditationMutation,
  useUpdateMeditationMutation,
  useDeleteMeditationMutation,
} = meditationsApiSlice;
