import { Router } from 'express';
import driverRouter from '../driver/router.js';
import authRouter from '../auth/router.js';
const router = Router();

router.use('/driver', driverRouter);
router.use('/auth', authRouter);


export default router;