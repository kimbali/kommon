import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from '../controllers/taskController.js';

const router = express.Router();

router.route('/').get(protect, getTasks).post(protect, admin, createTask);
router
  .route('/:id')
  .get(checkObjectId, protect, getTaskById)
  .put(checkObjectId, protect, admin, updateTask)
  .delete(checkObjectId, protect, admin, deleteTask);

export default router;
