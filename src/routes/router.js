import { Router } from 'express';
import driverRouter from '../driver/router';
const router = Router();

router.use('/driver', driverRouter);


export default { router };