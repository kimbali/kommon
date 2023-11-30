import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';
import {
  createMeditation,
  deleteMeditation,
  getMeditationById,
  getMeditations,
  updateMeditation,
} from '../controllers/meditationController.js';

const router = express.Router();

router
  .route('/')
  .get(protect, getMeditations)
  .post(protect, admin, createMeditation);
router
  .route('/:id')
  .get(checkObjectId, getMeditationById)
  .put(checkObjectId, protect, admin, updateMeditation)
  .delete(checkObjectId, protect, admin, deleteMeditation);

export default router;
