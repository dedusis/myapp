const express = require('express')
const router = express.Router();
const { getAllUsersController  } = require('./controller');
const { createDriverController } = require('./controller');
const { getDriverByIdController } = require('./controller');


//get all drivers
router.get('/admin/alldrivers', getAllUsersController);

//create driver
router.post('/admin/newdriver', createDriverController);

//get driver by id
router.get('/admin/driver/:id', getDriverByIdController);

module.exports = router; 