import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiRequest } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AssignTruckPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [drivers, setDrivers] = useState([]);
  const [trucks, setTrucks] = useState([]);
  const [selectedDriverId, setSelectedDriverId] = useState('');
  const [selectedTruckId, setSelectedTruckId] = useState('');
  const [message, setMessage] = useState('');

  // Fetch unassigned drivers and available trucks
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allDrivers = await apiRequest('/driver/all', 'GET', token);
        const allTrucks = await apiRequest('/truck/all', 'GET', token);

        const unassignedDrivers = allDrivers.filter(d => !d.assignedTruck);
        const availableTrucks = allTrucks.filter(t => t.isAvailable && !t.assignedDriver);

        setDrivers(unassignedDrivers);
        setTrucks(availableTrucks);
      } catch (err) {
        setMessage('Failed to load data.');
      }
    };

    fetchData();
  }, [token]);

  const handleAssign = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!selectedDriverId || !selectedTruckId) {
      setMessage('Please select both a driver and a truck.');
      return;
    }

    try {
      const response = await apiRequest('/truck/assign', 'PATCH', token, {
        truckId: selectedTruckId,
        driverId: selectedDriverId,
      });

      if (response.error) {
        setMessage(`Error: ${response.error}`);
      } else {
        setMessage('Truck successfully assigned!');
        setSelectedDriverId('');
        setSelectedTruckId('');
      }
    } catch (err) {
      setMessage('Server error while assigning truck.');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Assign Truck to Driver</h2>

      <form onSubmit={handleAssign} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Select Driver:</label>
          <select
            value={selectedDriverId}
            onChange={(e) => setSelectedDriverId(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">-- Choose a driver --</option>
            {drivers.map(driver => (
              <option key={driver._id} value={driver._id}>
                {driver.name} {driver.lastname} ({driver.licenseNumber})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Select Truck:</label>
          <select
            value={selectedTruckId}
            onChange={(e) => setSelectedTruckId(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">-- Choose a truck --</option>
            {trucks.map(truck => (
              <option key={truck._id} value={truck._id}>
                {truck.plateNumber} - {truck.brand} {truck.model}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Assign
        </button>

        {message && (
          <div className="mt-4 text-sm text-red-600">
            {message}
          </div>
        )}
      </form>

      <button
        onClick={() => navigate('/admin')}
        className="mt-6 text-blue-500 hover:underline"
      >
        ← Back
      </button>
    </div>
  );
};

export default AssignTruckPage;