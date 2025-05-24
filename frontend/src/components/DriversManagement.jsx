import React, { useEffect, useState } from 'react';
import { apiRequest } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DriversManagement = () => {
  const { token } = useAuth();
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    lastname: '',
    licenseNumber: '',
    role: '',
  });
  const [loading, setLoading] = useState(false);
  const [searchId, setSearchId] = useState('');
  const [searchedDriver, setSearchedDriver] = useState(null);
  const [searchError, setSearchError] = useState('');
  const navigate = useNavigate();

  const fetchDrivers = async () => {
    setLoading(true);
    try {
      const res = await apiRequest('/driver/all', 'GET', token);
      setDrivers(res);
    } catch (err) {
      console.error('Failed to fetch drivers:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleDelete = async (id) => {
    await apiRequest(`/driver/${id}`, 'DELETE', token);
    fetchDrivers();
  };

  const handleEdit = (driver) => {
    setEditingId(driver._id);
    setFormData({
      username: driver.username || '',
      name: driver.name || '',
      lastname: driver.lastname || '',
      licenseNumber: driver.licenseNumber || '',
      role: driver.role || '',
      password: '',
    });
  };

  const handleInfo = (driver) => {
    setSelectedDriver(driver);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await apiRequest(`/driver/${editingId}`, 'PUT', token, formData);
    }
    setEditingId(null);
    setFormData({
      username: '',
      password: '',
      name: '',
      lastname: '',
      licenseNumber: '',
      role: '',
    });
    fetchDrivers();
  };

  const handleSearch = async () => {
    if (!searchId) return;

    try {
      const res = await apiRequest(`/driver/${searchId}`, 'GET', token);

      if (res.error || !res._id) {
        setSearchError('Driver not found');
        setSearchedDriver(null);
      } else {
        setSearchedDriver(res);
        setSearchError('');
      }
    } catch (error) {
      setSearchError('Driver not found');
      setSearchedDriver(null);
    }
  };

  return (
    <div className="p-4">
      {/* Header with create button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Manage Drivers</h2>
        <button
          onClick={() => navigate('/admin/create-driver')}
          className="bg-green-600 text-white px-4 py-2 rounded-full text-xl"
        >
          ➕
        </button>
      </div>

      {/* Search by ID */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Search Driver by ID</h3>
        <div className="flex space-x-2">
          <input
            className="border p-2 w-full"
            placeholder="Enter Driver ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </div>
        {searchError && <p className="text-red-600 mt-2">{searchError}</p>}
        {searchedDriver && (
          <div className="mt-4 border p-4 rounded shadow bg-gray-100">
            <h4 className="font-bold mb-2">Driver Found:</h4>
            <p><strong>ID:</strong> {searchedDriver._id}</p>
            <p><strong>Username:</strong> {searchedDriver.username}</p>
            <p><strong>Name:</strong> {searchedDriver.name}</p>
            <p><strong>Lastname:</strong> {searchedDriver.lastname}</p>
            <p><strong>License Number:</strong> {searchedDriver.licenseNumber}</p>

            {searchedDriver.assignedTruck ? (
              typeof searchedDriver.assignedTruck === 'object' ? (
                <div>
                  <p><strong>Assigned Truck:</strong></p>
                  <ul className="ml-4 list-disc">
                    <li><strong>Plate:</strong> {searchedDriver.assignedTruck.plateNumber}</li>
                    <li><strong>Brand:</strong> {searchedDriver.assignedTruck.brand}</li>
                    <li><strong>Model:</strong> {searchedDriver.assignedTruck.model}</li>
                  </ul>
                </div>
              ) : (
                <p><strong>Assigned Truck:</strong> {searchedDriver.assignedTruck}</p>
              )
            ) : (
              <p><strong>Assigned Truck:</strong> None</p>
            )}
          </div>
        )}

      </div>

      {/* Driver list */}
      {loading ? <p>Loading drivers...</p> : (
        <table className="w-full mb-4 border">
          <thead>
            <tr>
              <th className="text-left p-2 border-b">Username</th>
              <th className="text-left p-2 border-b">Name</th>
              <th className="p-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map(driver => (
              <tr key={driver._id} className="border-b">
                <td className="p-2">{driver.username}</td>
                <td className="p-2">{driver.name}</td>
                <td className="p-2 flex gap-2 justify-center">
                  <button className="bg-blue-500 text-white px-2 py-1" onClick={() => handleEdit(driver)}>Edit</button>
                  <button className="bg-red-500 text-white px-2 py-1" onClick={() => handleDelete(driver._id)}>Delete</button>
                  <button className="bg-gray-600 text-white px-2 py-1" onClick={() => handleInfo(driver)}>Info</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Info section */}
      {selectedDriver && (
        <div className="bg-gray-100 p-4 mb-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Driver Info</h3>
          <p><strong>ID:</strong> {selectedDriver._id}</p>
          <p><strong>Name:</strong> {selectedDriver.name}</p>
          <p><strong>Lastname:</strong> {selectedDriver.lastname}</p>
          <p><strong>License Number:</strong> {selectedDriver.licenseNumber}</p>
          <p><strong>Username:</strong> {selectedDriver.username}</p>

          {selectedDriver.assignedTruck ? (
            typeof selectedDriver.assignedTruck === 'object' ? (
              <div>
                <p><strong>Assigned Truck:</strong></p>
                <ul className="ml-4 list-disc">
                  <li><strong>Plate Number:</strong> {selectedDriver.assignedTruck.plateNumber}</li>
                  <li><strong>Brand:</strong> {selectedDriver.assignedTruck.brand}</li>
                  <li><strong>Model:</strong> {selectedDriver.assignedTruck.model}</li>
                </ul>
              </div>
            ) : (
              <p><strong>Assigned Truck:</strong> {selectedDriver.assignedTruck}</p>
            )
          ) : (
            <p><strong>Assigned Truck:</strong> None</p>
          )}
        </div>
      )}

      {/* Edit form */}
      {editingId && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Edit Driver</h3>
          <form onSubmit={handleSubmit} className="space-y-2">
            <input className="border p-2 w-full" placeholder="Username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} required />
            <input className="border p-2 w-full" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            <input className="border p-2 w-full" placeholder="Lastname" value={formData.lastname} onChange={(e) => setFormData({ ...formData, lastname: e.target.value })} required />
            <input className="border p-2 w-full" placeholder="License Number" value={formData.licenseNumber} onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })} required />
            <input className="border p-2 w-full" placeholder="Role" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} required />
            <input className="border p-2 w-full" type="password" placeholder="New Password (optional)" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Update Driver</button>
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

export default DriversManagement;
