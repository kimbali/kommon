import { TASKS_URL } from '../config/constants';
import { apiSlice } from './apiSlice';

export const tasksApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getTasks: builder.query({
      query: ({ keyword }) => ({
        url: TASKS_URL,
        params: { keyword },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Tasks'],
    }),
    getTaskDetails: builder.query({
      query: taskId => ({
        url: `${TASKS_URL}/${taskId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createTask: builder.mutation({
      query: data => ({
        url: `${TASKS_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Task'],
    }),
    updateTask: builder.mutation({
      query: data => ({
        url: `${TASKS_URL}/${data.taskId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Tasks'],
    }),
    deleteTask: builder.mutation({
      query: taskId => ({
        url: `${TASKS_URL}/${taskId}`,
        method: 'DELETE',
      }),
      providesTags: ['Task'],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskDetailsQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApiSlice;
