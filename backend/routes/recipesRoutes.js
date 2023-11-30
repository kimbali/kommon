import express from 'express';
// import recipes from '../fakeData/recipes.js';
import {
  createRecipe,
  deleteRecipe,
  getRecipeById,
  getRecipes,
  updateRecipe,
} from '../controllers/recipeController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

const router = express.Router();

router.route('/').get(protect, getRecipes).post(protect, admin, createRecipe);
router
  .route('/:id')
  .get(checkObjectId, protect, getRecipeById)
  .put(checkObjectId, protect, admin, updateRecipe)
  .delete(checkObjectId, protect, admin, deleteRecipe);

export default router;
