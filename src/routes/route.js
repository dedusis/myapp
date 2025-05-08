const express = require('express');
const adminRouter = require('../admin/route');
const router = express.Router();

router.use('/', adminRouter);


module.exports = router;