import { UPLOAD_URL } from '../config/constants';
import { apiSlice } from './apiSlice';

export const imagesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    uploadRecipeImage: builder.mutation({
      query: data => ({
        url: UPLOAD_URL,
        method: 'POST',
        body: data,
      }),
    }),
    getImageUrl: builder.query({
      query: ({ url }) => ({
        url: `${UPLOAD_URL}/${url}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Images'],
    }),
  }),
});

export const { useUploadRecipeImageMutation, useGetImageUrlQuery } =
  imagesApiSlice;
