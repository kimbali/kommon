import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';
import {
  createGift,
  deleteAllGifts,
  deleteGift,
  getGiftById,
  getGifts,
  updateGift,
} from '../controllers/giftsController.js';

const router = express.Router();

router
  .route('/')
  .get(getGifts)
  .post(protect, admin, createGift)
  .delete(protect, admin, deleteAllGifts);
router
  .route('/:id')
  .get(checkObjectId, getGiftById)
  .put(checkObjectId, protect, admin, updateGift)
  .delete(checkObjectId, protect, admin, deleteGift);

export default router;
