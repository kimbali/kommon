import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  deleteAllNoAdminUsers,
  updateUserCheckout,
  forgotPassword,
  resetPassword,
} from '../controllers/userController.js';

const router = express.Router();

router
  .route('/')
  .post(registerUser)
  .get(protect, admin, getUsers)
  .delete(protect, admin, deleteAllNoAdminUsers);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route('/checkout').put(updateUserCheckout);
router
  .route('/:id')
  .delete(checkObjectId, protect, admin, deleteUser)
  .get(checkObjectId, protect, admin, getUserById)
  .put(checkObjectId, protect, admin, updateUser);

export default router;
