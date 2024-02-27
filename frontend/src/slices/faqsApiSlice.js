import { FAQS_URL } from '../config/constants';
import { apiSlice } from './apiSlice';

export const faqsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getFaqs: builder.query({
      query: () => ({
        url: FAQS_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Faqs'],
    }),
    getFaqDetails: builder.query({
      query: faqId => ({
        url: `${FAQS_URL}/${faqId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createFaq: builder.mutation({
      query: data => ({
        url: `${FAQS_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Faq'],
    }),
    updateFaq: builder.mutation({
      query: data => ({
        url: `${FAQS_URL}/${data._id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Faqs'],
    }),
    deleteFaq: builder.mutation({
      query: faqId => ({
        url: `${FAQS_URL}/${faqId}`,
        method: 'DELETE',
      }),
      providesTags: ['Faq'],
    }),
  }),
});

export const {
  useGetFaqsQuery,
  useGetFaqDetailsQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useBuyOneFaqMutation,
  useDeleteFaqMutation,
} = faqsApiSlice;
