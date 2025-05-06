const express = require('express');
const driverRouter = require('../admin/route');
const router = express.Router();

router.use('/alldrivers', driverRouter);


module.exports = router;