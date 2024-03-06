import { apiSlice } from './apiSlice';
import { USERS_URL } from '../config/constants';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: data => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    forgotPassword: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/forgot-password`,
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/reset-password`,
        method: 'POST',
        body: data,
      }),
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile`,
      }),
      providesTags: ['User'],
      keepUnusedDataFor: 5,
    }),
    checkout: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/checkout`,
        method: 'PUT',
        body: data,
      }),
    }),
    profile: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: ({ keyWord, marathon }) => ({
        url: `${USERS_URL}?keyword=${keyWord}&marathon=${marathon}`,
      }),
      providesTags: ['User'],
      keepUnusedDataFor: 5,
    }),
    deleteUser: builder.mutation({
      query: userId => ({
        url: `${USERS_URL}/${userId}`,
        method: 'DELETE',
      }),
    }),
    getUserDetails: builder.query({
      query: id => ({
        url: `${USERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateUser: builder.mutation({
      query: data => ({
        url: `${USERS_URL}/${data._id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useCheckoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useProfileMutation,
  useGetUserProfileQuery,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useGetUserDetailsQuery,
} = userApiSlice;
