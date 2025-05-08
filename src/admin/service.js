// milame me basi edw
const mongoose = require('mongoose');
const Driver = require('../models/Driver');

const getAllUsers = async () => {
    const drivers = await Driver.find();
    return drivers;
};

const createDriver = async (driverData) => {
    const newDriver = new Driver(driverData);
    await newDriver.save();
    return newDriver;
};

const getDriverById = async (id) => {
    const DriverById = await Driver.findById(id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid ID")
    }
    return DriverById;
}


module.exports = { getAllUsers, createDriver, getDriverById };