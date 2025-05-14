import express from 'express';
import truckcontroller from './controller.js';



const router = express.Router();

//get all trucks
router.get('/all', truckcontroller.getAllTrucksController);

//create truck
router.post('/', truckcontroller.createTruckController);

//get truck by id
router.get('/:id', truckcontroller.getTruckByIdController);

//update truck
router.put('/:id', truckcontroller.updateTruckController);

//delete truck
router.delete('/:id', truckcontroller.deleteTruckController);

export default router;