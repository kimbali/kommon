import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';
import {
  createIngredient,
  deleteAllIngredients,
  deleteIngredient,
  getIngredientById,
  getIngredients,
  updateIngredient,
} from '../controllers/ingredientController.js';

const router = express.Router();

router
  .route('/')
  .get(protect, getIngredients)
  .post(protect, admin, createIngredient)
  .delete(protect, admin, deleteAllIngredients);
router
  .route('/:id')
  .get(checkObjectId, protect, getIngredientById)
  .put(checkObjectId, protect, admin, updateIngredient)
  .delete(checkObjectId, protect, admin, deleteIngredient);

export default router;
