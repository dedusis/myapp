import express from 'express';
import truckcontroller from './controller.js';
import { verifyToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.use(verifyToken);

//get my truck
router.get('/my-truck', truckcontroller.getMyTruckController);

//update my truck
router.patch('/my-truck', truckcontroller.updateMyTruckController);


//get all trucks
router.get('/all', isAdmin, truckcontroller.getAllTrucksController);

//create truck
router.post('/', isAdmin, truckcontroller.createTruckController);

//get truck by plate number
router.get('/:plate', isAdmin, truckcontroller.getTruckByPlateNumberController);

//update truck
router.put('/:id', isAdmin, truckcontroller.updateTruckController);

//delete truck
router.delete('/:id', isAdmin, truckcontroller.deleteTruckController);

//assign
router.patch('/assign', isAdmin, truckcontroller.assignTruckToDriverController);


export default router;