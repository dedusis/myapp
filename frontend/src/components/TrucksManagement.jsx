import React, { useEffect, useState } from 'react';
import { apiRequest } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const TrucksManagement = () => {
  const { token } = useAuth();
  const [trucks, setTrucks] = useState([]);
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    plateNumber: '',
    brand: '',
    model: '',
    year: '',
    isAvailable: false,
    mileage: 0,
    lastMaintenance: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchTrucks = async () => {
    setLoading(true);
    const res = await apiRequest('/truck/all', 'GET', token);
    setTrucks(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchTrucks();
  }, []);

  const handleDelete = async (id) => {
    await apiRequest(`/truck/${id}`, 'DELETE', token);
    fetchTrucks();
  };

  const handleEdit = (truck) => {
    setEditingId(truck._id);
    setFormData({
      plateNumber: truck.plateNumber || '',
      brand: truck.brand || '',
      model: truck.model || '',
      year: truck.year || '',
      isAvailable: truck.isAvailable || false,
      mileage: truck.mileage || 0,
      lastMaintenance: truck.lastMaintenance
        ? new Date(truck.lastMaintenance).toISOString().split('T')[0]
        : '',
    });
  };

  const handleInfo = (truck) => {
    setSelectedTruck(truck);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await apiRequest(`/truck/${editingId}`, 'PUT', token, formData);
    }
    setEditingId(null);
    setFormData({
      plateNumber: '',
      brand: '',
      model: '',
      year: '',
      isAvailable: false,
      mileage: 0,
      lastMaintenance: '',
    });
    fetchTrucks();
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Manage Trucks</h2>
        <h2>
        <button
          onClick={() => navigate('/admin/create-truck')}
          className="bg-green-600 text-white px-4 py-2 rounded-full text-xl"
        >
          ➕
        </button>
        </h2>
      </div>

      {loading ? <p>Loading trucks...</p> : (
        <table className="w-full mb-4 border">
          <thead>
            <tr>
              <th className="text-left p-2 border-b">Plate Number</th>
              <th className="text-left p-2 border-b">Brand</th>
              <th className="p-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trucks.map(truck => (
              <tr key={truck._id} className="border-b">
                <td className="p-2">{truck.plateNumber}</td>
                <td className="p-2">{truck.brand}</td>
                <td className="p-2 flex gap-2 justify-center">
                  <button className="bg-blue-500 text-white px-2 py-1" onClick={() => handleEdit(truck)}>Edit</button>
                  <button className="bg-red-500 text-white px-2 py-1" onClick={() => handleDelete(truck._id)}>Delete</button>
                  <button className="bg-gray-600 text-white px-2 py-1" onClick={() => handleInfo(truck)}>Info</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedTruck && (
        <div className="bg-gray-100 p-4 mb-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Truck Info</h3>
          <p><strong>ID:</strong> {selectedTruck._id}</p>
          <p><strong>Plate:</strong> {selectedTruck.plateNumber}</p>
          <p><strong>Brand:</strong> {selectedTruck.brand}</p>
          <p><strong>Model:</strong> {selectedTruck.model}</p>
          <p><strong>Year:</strong> {selectedTruck.year}</p>
          <p><strong>Available:</strong> {selectedTruck.isAvailable ? 'Yes' : 'No'}</p>
          <p><strong>Mileage:</strong> {selectedTruck.mileage} km</p>
          <p><strong>Last Maintenance:</strong> {selectedTruck.lastMaintenance?.split('T')[0] || 'N/A'}</p>

          {/* Assigned Driver handling */}
          {selectedTruck.assignedDriver ? (
            typeof selectedTruck.assignedDriver === 'object' ? (
              <div>
                <p><strong>Assigned Driver:</strong></p>
                <ul className="ml-4 list-disc">
                  <li><strong>Name:</strong> {selectedTruck.assignedDriver.name}</li>
                  <li><strong>Lastname:</strong> {selectedTruck.assignedDriver.lastname}</li>
                  <li><strong>licenseNumber:</strong> {selectedTruck.assignedDriver.licenseNumber}</li>
                </ul>
              </div>
            ) : (
              <p><strong>Assigned Driver:</strong> {selectedTruck.assignedDriver}</p>
            )
          ) : (
            <p><strong>Assigned Driver:</strong> None</p>
          )}
        </div>
      )}


      {editingId && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Edit Truck</h3>
          <form onSubmit={handleSubmit} className="space-y-2">
            <input className="border p-2 w-full" placeholder="Plate Number" value={formData.plateNumber} onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })} required />
            <input className="border p-2 w-full" placeholder="Brand" value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value })} required />
            <input className="border p-2 w-full" placeholder="Model" value={formData.model} onChange={(e) => setFormData({ ...formData, model: e.target.value })} required />
            <input className="border p-2 w-full" type="number" placeholder="Year" value={formData.year} onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })} required />
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={formData.isAvailable} onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })} />
              Available
            </label>
            <input className="border p-2 w-full" type="number" placeholder="Mileage" value={formData.mileage} onChange={(e) => setFormData({ ...formData, mileage: parseInt(e.target.value) })} />
            <input className="border p-2 w-full" type="date" value={formData.lastMaintenance} onChange={(e) => setFormData({ ...formData, lastMaintenance: e.target.value })} />
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Update Truck</button>
          </form>
        </div>
      )}

    <button
        onClick={() => navigate('/admin')}
        className="mt-6 text-blue-500 hover:underline"
      >
        ← Back
      </button>
    </div>
  );
};

export default TrucksManagement;
