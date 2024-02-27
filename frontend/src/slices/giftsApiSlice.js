import { GIFTS_URL } from '../config/constants';
import { apiSlice } from './apiSlice';

export const giftsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getGifts: builder.query({
      query: ({ quantity }) => ({
        url: GIFTS_URL,
        params: { quantity },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Gifts'],
    }),
    getGiftDetails: builder.query({
      query: giftId => ({
        url: `${GIFTS_URL}/${giftId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createGift: builder.mutation({
      query: data => ({
        url: `${GIFTS_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Gift'],
    }),
    updateGift: builder.mutation({
      query: data => ({
        url: `${GIFTS_URL}/${data._id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Gifts'],
    }),
    buyOneGift: builder.mutation({
      query: giftId => ({
        url: `${GIFTS_URL}/buyone/${giftId}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Gifts'],
    }),
    deleteGift: builder.mutation({
      query: giftId => ({
        url: `${GIFTS_URL}/${giftId}`,
        method: 'DELETE',
      }),
      providesTags: ['Gift'],
    }),
  }),
});

export const {
  useGetGiftsQuery,
  useGetGiftDetailsQuery,
  useCreateGiftMutation,
  useUpdateGiftMutation,
  useBuyOneGiftMutation,
  useDeleteGiftMutation,
} = giftsApiSlice;
