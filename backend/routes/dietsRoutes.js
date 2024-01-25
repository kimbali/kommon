import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';
import {
  getDiets,
  getDietById,
  createDiet,
  updateDiet,
  deleteDiet,
} from '../controllers/dietController.js';

const router = express.Router();

router.route('/').get(getDiets).post(protect, admin, createDiet);
router
  .route('/:id')
  .get(checkObjectId, protect, getDietById)
  .put(checkObjectId, protect, admin, updateDiet)
  .delete(checkObjectId, protect, admin, deleteDiet);

export default router;
