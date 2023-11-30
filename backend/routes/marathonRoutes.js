import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';
import {
  createMarathon,
  deleteMarathon,
  getMarathonById,
  getMarathonClientById,
  getMarathons,
  updateMarathon,
} from '../controllers/marathonController.js';

const router = express.Router();

router.route('/').get(getMarathons).post(protect, admin, createMarathon);
router
  .route('/:id')
  .get(checkObjectId, protect, getMarathonById)
  .put(checkObjectId, protect, admin, updateMarathon)
  .delete(checkObjectId, protect, admin, deleteMarathon);
router.route('/client/:id').get(checkObjectId, protect, getMarathonClientById);

export default router;
