// milame me basi edw
import { Types } from 'mongoose';
import Driver from './model.js';
import Truck from '../truck/model.js';
import brcypt from 'bcrypt';

const getAllUsers = async () => {
    const drivers = await Driver.find().populate({
        path: 'assignedTruck',
        model: Truck,
        select: 'plateNumber brand model year'
    });
    return drivers;
};

const createDriver = async (driverData) => {
    if (driverData.role === 'admin') {
        const existingAdmin = await Driver.findOne({ role: 'admin' });
        if (existingAdmin) {
            throw new Error('You cant create another admin');
        }
    }

    const newDriver = new Driver(driverData);
    await newDriver.save();
    return newDriver;
};

const getDriverById = async (id) => {
    const driver = await Driver.findById(id).populate({
        path: 'assignedTruck',
        model: Truck,
        select: 'plateNumber brand model year'
    });
    if (!Types.ObjectId.isValid(id)) {
        throw new Error("Invalid ID")
    }
    return driver;
}

import bcrypt from 'bcrypt';

const updateDriverById = async (id, data) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error("Invalid ID");
    }

    if (data.password) {
        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(data.password, salt);
    }

    const updateDriver = await Driver.findByIdAndUpdate(id, data, { new: true });
    return updateDriver;
};

const deleteDriverById = async (id) => {
    const delDriverById = await Driver.findByIdAndDelete(id);
    if (!Types.ObjectId.isValid(id)) {
        throw new Error("Invalid ID")
    }

    if (!delDriverById) {
        return null;
    }

    if (delDriverById.assignedTruck) {
        const truck = await Truck.findById(delDriverById.assignedTruck);
        if (truck) {
            truck.assignedDriver = null;
            await truck.save();
        }
    }

    return delDriverById;
};




export default { 
    getAllUsers,
    createDriver,
    getDriverById, 
    updateDriverById,
    deleteDriverById };