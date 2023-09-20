import { RECIPES_URL } from '../config/constants';
import { apiSlice } from './apiSlice';

export const recipesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getRecipes: builder.query({
      query: ({ keyword }) => ({
        url: RECIPES_URL,
        params: { keyword },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Recipes'],
    }),
    getRecipeDetails: builder.query({
      query: recipeId => ({
        url: `${RECIPES_URL}/${recipeId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createRecipe: builder.mutation({
      query: data => ({
        url: `${RECIPES_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Recipe'],
    }),
    updateRecipe: builder.mutation({
      query: data => ({
        url: `${RECIPES_URL}/${data.recipeId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Recipes'],
    }),
    deleteRecipe: builder.mutation({
      query: recipeId => ({
        url: `${RECIPES_URL}/${recipeId}`,
        method: 'DELETE',
      }),
      providesTags: ['Recipe'],
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useGetRecipeDetailsQuery,
  useCreateRecipeMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
} = recipesApiSlice;
