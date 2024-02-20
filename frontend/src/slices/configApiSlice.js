import { CONFIG_URL } from '../config/constants';
import { apiSlice } from './apiSlice';

export const configsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getConfigs: builder.query({
      query: () => ({
        url: CONFIG_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Configs'],
    }),
    getConfigDetails: builder.query({
      query: configId => ({
        url: `${CONFIG_URL}/${configId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getConfigLanding: builder.query({
      query: lang => ({
        url: `${CONFIG_URL}/landing/${lang}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createConfig: builder.mutation({
      query: data => ({
        url: `${CONFIG_URL}`,
        method: 'POST',
      }),
      invalidatesTags: ['Config'],
    }),
    updateConfig: builder.mutation({
      query: data => {
        return {
          url: `${CONFIG_URL}/${data._id}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['Configs'],
    }),
    deleteConfig: builder.mutation({
      query: configId => ({
        url: `${CONFIG_URL}/${configId}`,
        method: 'DELETE',
      }),
      providesTags: ['Config'],
    }),
  }),
});

export const {
  useGetConfigsQuery,
  useGetConfigDetailsQuery,
  useGetConfigLandingQuery,
  useCreateConfigMutation,
  useUpdateConfigMutation,
  useDeleteConfigMutation,
} = configsApiSlice;
