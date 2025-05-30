import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UpdateTruckPage = () => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    mileage: '',
    lastMaintenance: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/truck/my-truck', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    const result = await res.json();
    setMessage(result.message || 'Update complete.');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Update My Truck</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className='text-lg font-semibold'>Mileage:</label>
          <input
            type="number"
            name="mileage"
            value={formData.mileage}
            onChange={handleChange}
            className="border p-2 rounded w-full mb-4"
          />
        </div>
        <div>
          <label className='text-lg font-semibold mb-4'>Last Maintenance Date:</label>
          <input
            type="date"
            name="lastMaintenance"
            value={formData.lastMaintenance}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
        
        <button type="submit" className="bg-blue-500 text-white text-xl font-bold px-4 py-2 rounded">
          Update
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
      <button
        onClick={() => navigate('/driver')}
        className="text-blue-600 text-lg font-bold hover:underline mb-2"
      >
        ← Back
      </button>
    </div>
  );
};

export default UpdateTruckPage;