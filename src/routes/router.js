import { Router } from 'express';
import driverRouter from '../driver/router.js';
const router = Router();

router.use('/driver', driverRouter);


export default router;