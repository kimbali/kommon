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

router.route('/').get(getRecipes).post(createRecipe);
router
  .route('/:id')
  .get(checkObjectId, getRecipeById)
  .put(checkObjectId, updateRecipe)
  .delete(checkObjectId, deleteRecipe);

export default router;
