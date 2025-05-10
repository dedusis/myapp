import express from 'express';
import driverConroller from './controller.js';


const router = express.Router();

//get all drivers
router.get('/all', driverConroller.getAllUsersController);

//create driver
router.post('/', driverConroller.createDriverController);

//get driver by id
router.get('/:id', driverConroller.getDriverByIdController);

//update driver by id
router.put('/:id', driverConroller.updateDriverByIdController);

//delete driver by id
router.delete('/:id', driverConroller.deleteDriverByIdController);

export default router; 