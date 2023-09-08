import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';
import {
  createMeasure,
  deleteMeasure,
  getMeasureById,
  getMeasures,
  updateMeasure,
} from '../controllers/measuresController.js';

const router = express.Router();

router.route('/').get(getMeasures).post(createMeasure);
router
  .route('/:id')
  .get(checkObjectId, getMeasureById)
  .put(checkObjectId, updateMeasure)
  .delete(checkObjectId, deleteMeasure);

export default router;
