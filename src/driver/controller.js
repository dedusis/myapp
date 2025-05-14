import driverService from './service.js';


const getAllUsersController = async (req, res) => {
  try {
    const drivers = await driverService.getAllUsers();
    console.log("Driver list:", drivers);
    res.status(200).json(drivers);
  } catch (err) {
    console.error('Error fetching drivers:', err);
    res.status(500).json({ error: 'Server error while fetching drivers' });
  }
};

const createDriverController = async (req, res) => {
  try {
    const newDriver = await driverService.createDriver(req.body);
    console.log("creating driver:", newDriver);
    res.status(201).json({ Message: 'Driver created successfully', driver: newDriver });
  } catch (err) {
    console.error('Error creating driver:', err);

    if (err.message.includes('admin')) {
      return res.status(400).json({ error: err.message  });
    }

    res.status(500).json({ error: 'Server error while creating driber' });
  }
};

const getDriverByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const DriverById = await driverService.getDriverById(id);

    console.log("The Driver with id:", id, "is:", DriverById);

    if (!DriverById) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    res.status(200).json(DriverById);
  } catch (err) {
    console.error('Error fetching driver by ID:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

const updateDriverByIdController = async (req,res) => {
  try {
    const id = req.params.id;
    const updatedDriver = await driverService.updateDriverById(id, req.body);

    console.log("The updated driver with id:", id, "is: ", updatedDriver);

    if (!updatedDriver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    res.status(200).json({ message: 'Driver updated successfully', driver: updatedDriver });
  }catch (err) {
    console.error('Error updating driver:', err);
    res.status(500).json({ error: 'Server error while updating driver' });
  }
};

const deleteDriverByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const delDriverById = await driverService.deleteDriverById(id);

    console.log("Deleting the Driver:", delDriverById);

    if (!delDriverById) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    res.status(200).json({ message: 'Driver deleted succesfully' });
  }catch (err) {
    console.error('Error deleting driver', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export default { 
  getAllUsersController, 
  createDriverController, 
  getDriverByIdController, 
  updateDriverByIdController,
  deleteDriverByIdController };