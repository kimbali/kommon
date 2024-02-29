import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

import {
  getImage,
  upload,
  uploadImage,
} from '../controllers/imageController.js';

const router = express.Router();

router.route('/').post(upload.single('image'), uploadImage);
router.route('/:url').get(getImage);

export default router;
