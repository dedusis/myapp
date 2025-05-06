const express = require('express')
const { getAllUsersController  } = require('./controller');
const router = express.Router();


//ger all drivers
router.get("/", getAllUsersController );


module.exports = router;