import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';
import {
  createConfig,
  deleteConfig,
  getConfigById,
  getConfigs,
  updateConfig,
} from '../controllers/configController.js';

const router = express.Router();

router.route('/').get(getConfigs).post(createConfig);
router
  .route('/:id')
  .get(checkObjectId, getConfigById)
  .put(checkObjectId, updateConfig)
  .delete(checkObjectId, deleteConfig);

export default router;
