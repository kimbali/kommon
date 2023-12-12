import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';
import {
  getRegions,
  getRegionById,
  createRegion,
  updateRegion,
  deleteRegion,
} from '../controllers/regionController.js';

const router = express.Router();

router.route('/').get(getRegions).post(protect, admin, createRegion);
router
  .route('/:id')
  .get(checkObjectId, protect, getRegionById)
  .put(checkObjectId, protect, admin, updateRegion)
  .delete(checkObjectId, protect, admin, deleteRegion);

export default router;
