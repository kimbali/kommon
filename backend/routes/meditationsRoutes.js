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

router.route('/').get(getMeditations).post(createMeditation);
router
  .route('/:id')
  .get(checkObjectId, getMeditationById)
  .put(checkObjectId, updateMeditation)
  .delete(checkObjectId, deleteMeditation);

export default router;
