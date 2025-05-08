const { getAllUsers } = require('./service');
const { createDriver } = require('./service');
const { getDriverById } = require('./service');

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

const getDriverByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const DriverById = await getDriverById(id);

    console.log("The Driver whith id:", id, "is :", DriverById);

    if (!DriverById) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    res.status(200).json(DriverById);
  } catch (err) {
    console.error('Error fetching driver by ID:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getAllUsersController, createDriverController, getDriverByIdController };