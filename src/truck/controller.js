import truckService from './service.js';

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

export default {
    getAllTrucksController
};