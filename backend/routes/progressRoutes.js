import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';
import {
  getProgresses,
  getProgressById,
  createProgress,
  updateProgress,
  deleteProgress,
  deleteAllProgresses,
} from '../controllers/progressController.js';

const router = express.Router();

router
  .route('/')
  .get(protect, getProgresses)
  .post(protect, createProgress)
  .delete(protect, admin, deleteAllProgresses);
router
  .route('/:id')
  .get(checkObjectId, protect, getProgressById)
  .put(checkObjectId, protect, updateProgress)
  .delete(checkObjectId, protect, admin, deleteProgress);

export default router;
