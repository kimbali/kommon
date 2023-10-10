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

router.route('/').get(getWorkouts).post(createWorkout);
router
  .route('/:id')
  .get(checkObjectId, getWorkoutById)
  .put(checkObjectId, updateWorkout)
  .delete(checkObjectId, deleteWorkout);

export default router;
