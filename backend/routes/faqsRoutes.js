import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';
import {
  createFaq,
  deleteAllFaqs,
  deleteFaq,
  getFaqById,
  getFaqs,
  updateFaq,
} from '../controllers/faqController.js';

const router = express.Router();

router
  .route('/')
  .get(getFaqs)
  .post(protect, admin, createFaq)
  .delete(protect, admin, deleteAllFaqs);
router
  .route('/:id')
  .get(checkObjectId, getFaqById)
  .put(checkObjectId, protect, admin, updateFaq)
  .delete(checkObjectId, protect, admin, deleteFaq);

export default router;
