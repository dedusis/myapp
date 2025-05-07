const express = require('express')
const router = express.Router();
const { getAllUsersController  } = require('./controller');
const { createDriverController } = require('./controller');


//ger all drivers
router.get('/alldrivers', getAllUsersController);

//create driver
router.post('/newdriver', createDriverController);


module.exports = router; 