import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiRequest } from '../services/api';

const CreateTruckPage = () => {
  const [formData, setFormData] = useState({
    plateNumber: '',
    brand: '',
    model: '',
    year: '',
    isAvailable: true,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { token, user } = useAuth();

  if (user?.role !== 'admin') {
    return <div>Access denied</div>;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await apiRequest('/truck', 'POST', token, formData);

      if (response.error) {
        setError(response.error);
      } else {
        navigate('/admin/trucks');
      }
    } catch (err) {
      console.error('Create truck error:', err);
      setError('Failed to create truck');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Create New Truck</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">PlateNumber</label>
          <input
            type="text"
            name="plateNumber"
            value={formData.plateNumber}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Brand</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Model</label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-semibold">Year</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            min="1999"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isAvailable"
            checked={formData.isAvailable}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="font-semibold">Available</label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Create
        </button>
      </form>
      <button
        onClick={() => navigate('/admin/trucks')}
        className="mt-6 text-blue-500 hover:underline"
      >
        ← Back
      </button>
    </div>
  );
};

export default CreateTruckPage;