import { Types } from "mongoose";
import Truck from './model.js';
import Driver from '../driver/model.js';

const getAllTrucks = async () => {
    const trucks = await Truck.find().populate({
        path: 'assignedDriver',
        model: Driver,
        select: '_id name lastname licenseNumber'
    });
    return trucks;
};

const createTruck  = async (truckData) => {
    const newTruck = new Truck(truckData);
    await newTruck.save();
    return newTruck;
};

const getTruckByPlateNumber = async (plate) => {
    if (typeof plate !== 'string') {
        throw new Error('Invalid truck ID');
    }
    const normalizedPlate=plate.trim().toUpperCase();//gia na ginei case insensitive to input
    
    const truck = await Truck.findOne({plateNumber:normalizedPlate}).populate
    ({
        path: 'assignedDriver',
        model: Driver,
        select: '_id name lastname licenseNumber'
    });// gia na emfanizei ta details tou assigned driver
    return truck;
};

const updateTruck = async (id, truckData) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error('Invalid truck ID');
    }
    const updatedTruck = await Truck.findByIdAndUpdate(id, truckData, { new: true });
    return updatedTruck;
};

const deleteTruck = async (id) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error('Invalid truck ID');
    }

    const truck = await Truck.findById(id);
    if (!truck) {
        return null;
    }

    if (truck.assignedDriver) {
        const driver = await Driver.findById(truck.assignedDriver);
        if (driver) {
            driver.assignedTruck = null;
            await driver.save();
        }
    }

    const deletedTruck = await Truck.findByIdAndDelete(id);
    return deletedTruck;
}

//assign truck to driver
const assignTruckToDriver = async (truckId, driverId) => {
    const truck = await Truck.findById(truckId);
    if (!truck) {
        throw new Error('Truck not found');
    }

    const driver = await Driver.findById(driverId);
    if (!driver) {
        throw new Error('Driver not found');
    }

    const alreadyAssignedTruck = await Truck.findOne({ assignedDriver: driverId });
    if(alreadyAssignedTruck) {
        throw new Error('Driver is already assigned to another truck');
    }

    if (truck.assignedDriver) {
        throw new Error('Truck is already assigned to another driver');
    }

    driver.assignedTruck = truckId;
    await driver.save();

    truck.assignedDriver = driverId;
    await truck.save();
    return truck;
};


export default { 
    getAllTrucks,
    createTruck,
    getTruckByPlateNumber,
    updateTruck,
    deleteTruck,
    assignTruckToDriver
};