import { INGREDIENTS_URL } from '../config/constants';
import { apiSlice } from './apiSlice';

export const ingredientsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getIngredients: builder.query({
      query: ({ keyword }) => ({
        url: INGREDIENTS_URL,
        params: { keyword },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Ingredients'],
    }),
    getIngredientDetails: builder.query({
      query: ingredientId => ({
        url: `${INGREDIENTS_URL}/${ingredientId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createIngredient: builder.mutation({
      query: () => ({
        url: `${INGREDIENTS_URL}`,
        method: 'POST',
      }),
      invalidatesTags: ['Ingredient'],
    }),
    updateIngredient: builder.mutation({
      query: data => ({
        url: `${INGREDIENTS_URL}/${data.ingredientId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Ingredients'],
    }),
    deleteIngredient: builder.mutation({
      query: ingredientId => ({
        url: `${INGREDIENTS_URL}/${ingredientId}`,
        method: 'DELETE',
      }),
      providesTags: ['Ingredient'],
    }),
  }),
});

export const {
  useGetIngredientsQuery,
  useGetIngredientDetailsQuery,
  useCreateIngredientMutation,
  useUpdateIngredientMutation,
  useDeleteIngredientMutation,
} = ingredientsApiSlice;
