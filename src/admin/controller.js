const { getAllUsers } = require('./service');
const {createDriver} = require('./service');

const getAllUsersController = async (req, res) => {
  try {
    const drivers = await getAllUsers();
    console.log("Drivers list:", drivers);
    res.status(200).json(drivers);
  } catch (err) {
    console.error('Error fetching drivers:', err);
    res.status(500).json({ error: 'Server error while fetching drivers' });
  }
};

const createDriverController = async (req, res) => {
  try {
    const newDriver = await createDriver(req.body);
    console.log("creating driver:", newDriver);
    res.status(201).json({ Message: 'Driver created successfully', driver: newDriver });
  } catch (err) {
    console.error('Error creating driver:', err);
    res.status(500).json({ error: 'Server error while creating driber' });
  }
};


module.exports = { getAllUsersController, createDriverController };