import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';
import {
  createPlanning,
  deleteAllPlannings,
  deletePlanning,
  getPlanningById,
  getPlannings,
  updatePlanning,
} from '../controllers/planningController.js';

const router = express.Router();

router
  .route('/')
  .get(getPlannings)
  .post(createPlanning)
  .delete(deleteAllPlannings);
router
  .route('/:id')
  .get(checkObjectId, getPlanningById)
  .put(checkObjectId, updatePlanning)
  .delete(checkObjectId, deletePlanning);

export default router;
