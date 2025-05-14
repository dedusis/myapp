import express from 'express';
import truckcontroller from './controller.js';



const router = express.Router();

//get all trucks
router.get('/all', truckcontroller.getAllTrucksController);

export default router;