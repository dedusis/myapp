import { Types } from "mongoose";
import Truck from './model.js';

const getAllTrucks = async () => {
    const trucks = await Truck.find();
    return trucks;
};

const createTruck  = async (truckData) => {
    const newTruck = new Truck(truckData);
    await newTruck.save();
    return newTruck;
};

const getTruckById = async (id) => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error('Invalid truck ID');
    }
    const truck = await Truck.findById(id);
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
    const deletedTruck = await Truck.findByIdAndDelete(id);
    return deletedTruck;
}

export default { 
    getAllTrucks,
    createTruck,
    getTruckById,
    updateTruck,
    deleteTruck,
};