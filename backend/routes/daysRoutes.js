import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';
import {
  createDay,
  deleteDay,
  getDayById,
  getDays,
  updateDay,
  getDayByMarathonDiet,
  deleteAllDayInstances,
} from '../controllers/dayController.js';

const router = express.Router();

router.route('/').get(getDays).post(createDay).delete(deleteAllDayInstances);
router
  .route('/:id')
  .get(checkObjectId, getDayById)
  .put(checkObjectId, updateDay)
  .delete(checkObjectId, deleteDay);
router.route('/diet').get(getDayByMarathonDiet);

export default router;
