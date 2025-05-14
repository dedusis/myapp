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

const getTruckByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const truck = await truckService.getTruckById(id);
        if (!truck) {
            return res.status(404).json({ error: 'Truck not found' });
        }
        res.status(200).json(truck);
    } catch (err) {
        console.error('Error fetching truck:', err);
        res.status(500).json({ error: 'Server error while fetching truck' });
    }
}

const addTruckController = async (req, res) => {
    const truckData = req.body;
    try {
        const newTruck = await truckService.addTruck(truckData);
        res.status(201).json(newTruck);
    } catch (err) {
        console.error('Error adding truck:', err);
        res.status(500).json({ error: 'Server error while adding truck' });
    }
};

const updateTruckController = async (req, res) => {
    const { id } = req.params;
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
}

const deleteTruckController = async (req, res) => {
    const { id } = req.params;
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

//const getTrucksByDriverIdController = async (req, res) => {
   // const { driverId } = req.params;
    //try {
     //   const trucks = await truckService.getTrucksByDriverId(driverId);
       // if (!trucks) {
       //     return res.status(404).json({ error: 'No trucks found for this driver' });
       // }
      //  res.status(200).json(trucks);
   // } catch (err) {
        //console.error('Error fetching trucks by driver ID:', err);
      //  res.status(500).json({ error: 'Server error while fetching trucks by driver ID' });
   // }
//}

export default {
    getAllTrucksController
    ,
    getTruckByIdController,
    addTruckController,
    updateTruckController,
    deleteTruckController,
    //getTrucksByDriverIdController\
};