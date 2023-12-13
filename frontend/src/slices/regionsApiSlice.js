import { REGIONS_URL } from '../config/constants';
import { apiSlice } from './apiSlice';

export const regionsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getRegions: builder.query({
      query: ({ keyword }) => ({
        url: REGIONS_URL,
        params: keyword ? { keyword } : null,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Regions'],
    }),
    getRegionDetails: builder.query({
      query: regionId => ({
        url: `${REGIONS_URL}/${regionId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createRegion: builder.mutation({
      query: data => ({
        url: `${REGIONS_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Region'],
    }),
    updateRegion: builder.mutation({
      query: data => ({
        url: `${REGIONS_URL}/${data._id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Regions'],
    }),
    deleteRegion: builder.mutation({
      query: regionId => ({
        url: `${REGIONS_URL}/${regionId}`,
        method: 'DELETE',
      }),
      providesTags: ['Region'],
    }),
  }),
});

export const {
  useGetRegionsQuery,
  useGetRegionDetailsQuery,
  useCreateRegionMutation,
  useUpdateRegionMutation,
  useDeleteRegionMutation,
} = regionsApiSlice;
