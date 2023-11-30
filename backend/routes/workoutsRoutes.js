import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';
import {
  createWorkout,
  deleteWorkout,
  getWorkoutById,
  getWorkouts,
  updateWorkout,
} from '../controllers/workoutController.js';

const router = express.Router();

router.route('/').get(protect, getWorkouts).post(protect, admin, createWorkout);
router
  .route('/:id')
  .get(checkObjectId, protect, getWorkoutById)
  .put(checkObjectId, protect, admin, updateWorkout)
  .delete(checkObjectId, protect, admin, deleteWorkout);

export default router;
