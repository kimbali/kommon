import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';
import {
  createIngredient,
  deleteIngredient,
  getIngredientById,
  getIngredients,
  updateIngredient,
} from '../controllers/ingredientController.js';

const router = express.Router();

router.route('/').get(getIngredients).post(createIngredient);
router
  .route('/:id')
  .get(checkObjectId, getIngredientById)
  .put(checkObjectId, updateIngredient)
  .delete(checkObjectId, deleteIngredient);

export default router;
