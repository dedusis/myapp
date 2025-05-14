import { Types } from "mongoose";
import Truck from './model.js';

const getAllTrucks = async () => {
    const trucks = await Truck.find();
    return trucks;
};

export default { getAllTrucks };