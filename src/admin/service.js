// milame me basi edw
const Driver = require('../models/Driver');

const getAllUsers = async () => {
    const drivers = await Driver.find();
    return drivers;
};

const createDriver = async (driverData) => {
    const newDriver = new Driver(driverData);
    await newDriver.save();
    return newDriver;
}


module.exports = { getAllUsers, createDriver };