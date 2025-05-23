import express from 'express';
import loginController, { profileController } from './controller.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', loginController);
router.get('/profile', verifyToken, profileController);

export default router;
