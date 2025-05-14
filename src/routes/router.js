import { Router } from 'express';
import driverRouter from '../driver/router.js';
import authRouter from '../auth/router.js';
import truckRouter from '../truck/router.js';

const router = Router();

router.use('/driver', driverRouter);
router.use('/auth', authRouter);
router.use('/truck', truckRouter);



export default router;