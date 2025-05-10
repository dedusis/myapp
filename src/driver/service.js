// milame me basi edw
import { Types } from 'mongoose';
import Driver from './model';

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
    const driver = await Driver.findById(id);
    if (!Types.ObjectId.isValid(id)) {
        throw new Error("Invalid ID")
    }
    return driver;
}

const updateDriverById = async (id, data) => {
    const updateDriver = await Driver.findByIdAndUpdate(id, data, { new: true });
    if (!Types.ObjectId.isValid(id)) {
        throw new Error("Invalid ID")
    }
    return updateDriver;
};

const deleteDriverById = async (id) => {
    const delDriverById = await Driver.findByIdAndDelete(id);
    if (!Types.ObjectId.isValid(id)) {
        throw new Error("Invalid ID")
    }
    return delDriverById;
};




export default { 
    getAllUsers,
    createDriver,
    getDriverById, 
    updateDriverById,
    deleteDriverById };
