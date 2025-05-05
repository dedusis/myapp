const driverRouter = require('../drivers/route');


const router = express.Router();


router.use('/driver', driverRouter);


module.exports = router;