const express = require('express')
const router = express.Router();
const { getAllUsersController  } = require('./controller');
const { createDriverController } = require('./controller');
const { getDriverByIdController } = require('./controller');


//get all drivers
router.get('/alldrivers', getAllUsersController);

//create driver
router.post('/newdriver', createDriverController);

//get driver by id
router.get('/driver/:id', getDriverByIdController);

module.exports = router; 