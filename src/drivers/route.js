const { getAllUsers } = require('./controller');
const router = express.Router();


//Update driver by id
router.get("/", getAllUsers);


module.exports = router;