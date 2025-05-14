import express from 'express';
import truckcontroller from './controller.js';



const router = express.Router();

//get all trucks
router.get('/all', truckcontroller.getAllTrucksController);

//get truck by id
router.get('/:id', truckcontroller.getTruckByIdController);

//add truck
router.post('/add', truckcontroller.addTruckController);

//update truck
router.put('/update/:id', truckcontroller.updateTruckController);

//delete truck
router.delete('/delete/:id', truckcontroller.deleteTruckController);

//get trucks by driver id
//router.get('/driver/:driverId', truckcontroller.getTrucksByDriverIdController);

export default router;