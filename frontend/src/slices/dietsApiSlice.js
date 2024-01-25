import { DIETS_URL } from '../config/constants';
import { apiSlice } from './apiSlice';

export const dietsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getDiets: builder.query({
      query: ({ keyword }) => ({
        url: DIETS_URL,
        params: keyword ? { keyword } : null,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Diets'],
    }),
    getDietDetails: builder.query({
      query: dietId => ({
        url: `${DIETS_URL}/${dietId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createDiet: builder.mutation({
      query: data => ({
        url: `${DIETS_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Diet'],
    }),
    updateDiet: builder.mutation({
      query: data => ({
        url: `${DIETS_URL}/${data._id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Diets'],
    }),
    deleteDiet: builder.mutation({
      query: dietId => ({
        url: `${DIETS_URL}/${dietId}`,
        method: 'DELETE',
      }),
      providesTags: ['Diet'],
    }),
  }),
});

export const {
  useGetDietsQuery,
  useGetDietDetailsQuery,
  useCreateDietMutation,
  useUpdateDietMutation,
  useDeleteDietMutation,
} = dietsApiSlice;
