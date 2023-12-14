import express from 'express';
import { sendEmail } from '../controllers/emailController.js';

const router = express.Router();

router.route('/').get(sendEmail);

export default router;
