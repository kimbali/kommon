import { WORKOUTS_URL } from '../config/constants';
import { apiSlice } from './apiSlice';

export const workoutsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getWorkouts: builder.query({
      query: ({ keyword }) => ({
        url: WORKOUTS_URL,
        params: { keyword },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Workouts'],
    }),
    getWorkoutDetails: builder.query({
      query: workoutId => ({
        url: `${WORKOUTS_URL}/${workoutId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createWorkout: builder.mutation({
      query: data => ({
        url: `${WORKOUTS_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Workout'],
    }),
    updateWorkout: builder.mutation({
      query: data => {
        return {
          url: `${WORKOUTS_URL}/${data._id}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['Workouts'],
    }),
    deleteWorkout: builder.mutation({
      query: workoutId => ({
        url: `${WORKOUTS_URL}/${workoutId}`,
        method: 'DELETE',
      }),
      providesTags: ['Workout'],
    }),
  }),
});

export const {
  useGetWorkoutsQuery,
  useGetWorkoutDetailsQuery,
  useCreateWorkoutMutation,
  useUpdateWorkoutMutation,
  useDeleteWorkoutMutation,
} = workoutsApiSlice;
