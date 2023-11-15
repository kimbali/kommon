import { LEGALS_URL } from '../config/constants';
import { apiSlice } from './apiSlice';

export const legalsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getLegals: builder.query({
      query: () => ({
        url: LEGALS_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Legals'],
    }),
    getLegalDetails: builder.query({
      query: legalId => ({
        url: `${LEGALS_URL}/${legalId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createLegal: builder.mutation({
      query: data => ({
        url: `${LEGALS_URL}`,
        method: 'POST',
      }),
      invalidatesTags: ['Legal'],
    }),
    updateLegal: builder.mutation({
      query: data => {
        return {
          url: `${LEGALS_URL}/${data._id}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['Legals'],
    }),
    deleteLegal: builder.mutation({
      query: legalId => ({
        url: `${LEGALS_URL}/${legalId}`,
        method: 'DELETE',
      }),
      providesTags: ['Legal'],
    }),
  }),
});

export const {
  useGetLegalsQuery,
  useGetLegalDetailsQuery,
  useCreateLegalMutation,
  useUpdateLegalMutation,
  useDeleteLegalMutation,
} = legalsApiSlice;
