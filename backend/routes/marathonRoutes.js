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

router.route('/').get(getMarathons).post(createMarathon);
router
  .route('/:id')
  .get(checkObjectId, getMarathonById)
  .put(checkObjectId, updateMarathon)
  .delete(checkObjectId, deleteMarathon);
router.route('/client/:id').get(checkObjectId, getMarathonClientById);

export default router;
