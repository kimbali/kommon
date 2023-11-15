import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';
import {
  createLegal,
  deleteLegal,
  getLegalById,
  getLegals,
  updateLegal,
} from '../controllers/legalController.js';

const router = express.Router();

router.route('/').get(getLegals).post(createLegal);
router
  .route('/:id')
  .get(checkObjectId, getLegalById)
  .put(checkObjectId, updateLegal)
  .delete(checkObjectId, deleteLegal);

export default router;
