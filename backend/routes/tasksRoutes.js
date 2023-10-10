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

router.route('/').get(getTasks).post(createTask);
router
  .route('/:id')
  .get(checkObjectId, getTaskById)
  .put(checkObjectId, updateTask)
  .delete(checkObjectId, deleteTask);

export default router;
