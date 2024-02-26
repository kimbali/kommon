import { PLANNINGS_URL } from '../config/constants';
import { apiSlice } from './apiSlice';

export const planningsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getPlannings: builder.query({
      query: ({ keyword }) => ({
        url: PLANNINGS_URL,
        params: keyword ? { keyword } : null,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Plannings'],
    }),
    getPlanningDetails: builder.query({
      query: planningId => ({
        url: `${PLANNINGS_URL}/${planningId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createPlanning: builder.mutation({
      query: data => ({
        url: `${PLANNINGS_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Planning'],
    }),
    updatePlanning: builder.mutation({
      query: data => {
        return {
          url: `${PLANNINGS_URL}/${data.planId}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['Plannings'],
    }),
    deletePlanning: builder.mutation({
      query: planningId => ({
        url: `${PLANNINGS_URL}/${planningId}`,
        method: 'DELETE',
      }),
      providesTags: ['Planning'],
    }),
  }),
});

export const {
  useGetPlanningsQuery,
  useGetPlanningDetailsQuery,
  useCreatePlanningMutation,
  useUpdatePlanningMutation,
  useDeletePlanningMutation,
} = planningsApiSlice;
