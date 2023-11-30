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
  .get(protect, admin, getPlannings)
  .post(protect, admin, createPlanning)
  .delete(protect, admin, deleteAllPlannings);
router
  .route('/:id')
  .get(checkObjectId, protect, admin, getPlanningById)
  .put(checkObjectId, protect, admin, updatePlanning)
  .delete(checkObjectId, protect, admin, deletePlanning);

export default router;
