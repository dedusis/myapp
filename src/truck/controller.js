import truckService from './service.js';
import mongoose from 'mongoose';
import Truck from './model.js';

const getAllTrucksController = async (req, res) => {
    try {
        const trucks = await truckService.getAllTrucks();
        console.log("Truck list:", trucks);
        res.status(200).json(trucks);

    } catch (err) {
        console.error('Error fetching trucks:', err);
        res.status(500).json({ error: 'Server error while fetching trucks' });
    }
};

const createTruckController = async (req, res) => {
    const truckData = req.body;
    try {
        const newTruck = await truckService.createTruck(truckData);
        res.status(201).json(newTruck);
    } catch (err) {
        console.error('Error adding truck:', err);
        res.status(500).json({ error: 'Server error while adding truck' });
    }
};

const getTruckByPlateNumberController = async (req, res) => {
    const plate = req.params.plate;
    try {
        const truck = await truckService.getTruckByPlateNumber(plate);
        if (!truck) {
            return res.status(404).json({ error: 'Truck not found' });
        }
        res.status(200).json(truck);
    } catch (err) {
        console.error('Error fetching truck:', err);
        res.status(500).json({ error: 'Server error while fetching truck' });
    }
};

const updateTruckController = async (req, res) => {
    const id = req.params.id;
    const truckData = req.body;
    try {
        const updatedTruck = await truckService.updateTruck(id, truckData);
        if (!updatedTruck) {
            return res.status(404).json({ error: 'Truck not found' });
        }
        res.status(200).json(updatedTruck);
    } catch (err) {
        console.error('Error updating truck:', err);
        res.status(500).json({ error: 'Server error while updating truck' });
    }
};

const deleteTruckController = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedTruck = await truckService.deleteTruck(id);
        if (!deletedTruck) {
            return res.status(404).json({ error: 'Truck not found' });
        }
        res.status(200).json({ message: 'Truck deleted successfully' });
    } catch (err) {
        console.error('Error deleting truck:', err);
        res.status(500).json({ error: 'Server error while deleting truck' });
    }
};

//assign truck to driver
const assignTruckToDriverController = async (req, res) => {
    const { truckId, driverId } = req.body;
    try {
        const updateTruck = await truckService.assignTruckToDriver(truckId, driverId);
        res.status(200).json(updateTruck);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

//get my truck
const getMyTruckController = async (req, res) => {
    const driverId = req.user.id;

    try {
        const truck = await Truck.findOne({ assignedDriver: driverId });
        if(!truck) {
            return res.status(404).json({ message: 'No truck assigned to this driver' });
        }
        res.json(truck);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

//update my truck
const updateMyTruckController = async (req, res) => {
    const driverId = req.user.id

    try {
        const truck = await Truck.findOne({ assignedDriver: driverId });

        if (!truck) {
            return res.status(404).json({ error: 'Truck not assigned to this driver' });
        }

        const { mileage, lastMaintenance } = req.body;

        if (mileage !== undefined) truck.mileage = mileage;
        if (lastMaintenance !== undefined) truck.lastMaintenance = lastMaintenance;

        await truck.save();

        res.status(200).json({ message: 'Truck updated successfully', truck });
    } catch (err) {
        console.error('Error updating truck by driver:', err);
        res.status(500).json({ error: 'Server error while updating truck' });
    }
};

export default {
    getAllTrucksController,
    createTruckController,
    getTruckByPlateNumberController,
    updateTruckController,
    deleteTruckController,
    assignTruckToDriverController,
    getMyTruckController,
    updateMyTruckController
};