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
  getMonthDayByWeekAndWeekDay,
} from '../controllers/dayController.js';

const router = express.Router();

router
  .route('/')
  .get(protect, admin, getDays)
  .post(protect, admin, createDay)
  .delete(protect, admin, deleteAllDayInstances);
router
  .route('/:id')
  .get(checkObjectId, protect, getDayById)
  .put(checkObjectId, protect, admin, updateDay)
  .delete(checkObjectId, protect, admin, deleteDay);
router.route('/diet').get(getDayByMarathonDiet);
router
  .route('/month/:planningId/:week/:weekDay')
  .get(protect, getMonthDayByWeekAndWeekDay);

export default router;
