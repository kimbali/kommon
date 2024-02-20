import express from 'express';
import checkObjectId from '../middleware/checkObjectId.js';
import {
  createConfig,
  deleteConfig,
  getConfigById,
  getConfigs,
  getConfigsLanding,
  updateConfig,
} from '../controllers/configController.js';

const router = express.Router();

router.route('/').get(getConfigs).post(createConfig);
router.route('/landing/:lang').get(getConfigsLanding);
router
  .route('/:id')
  .get(checkObjectId, getConfigById)
  .put(checkObjectId, updateConfig)
  .delete(checkObjectId, deleteConfig);

export default router;
