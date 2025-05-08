const express = require('express')
const router = express.Router();
const { 
    getAllUsersController, 
    createDriverController, 
    getDriverByIdController, 
    updateDriverByIdController,
    deleteDriverByIdController 
  } = require('./controller');
  


//get all drivers
router.get('/admin/alldrivers', getAllUsersController);

//create driver
router.post('/admin/newdriver', createDriverController);

//get driver by id
router.get('/admin/driver/:id', getDriverByIdController);

//update driver by id
router.put('/admin/driver/:id', updateDriverByIdController);

//delete driver by id
router.delete('/admin/driver/:id', deleteDriverByIdController);

module.exports = router; 