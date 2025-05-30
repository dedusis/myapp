import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../style/CreateDriverPage.css';

const CreateDriverPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    lastname: '',
    licenseNumber: '',
    role: 'driver',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiRequest('/driver', 'POST', token, formData);
      alert('Driver created successfully!');
      navigate('/admin/drivers'); 
    } catch (err) {
      console.error('Error creating driver:', err);
    }
    
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create New Driver</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />
        <input
          type="password"
          className="border p-2 w-full"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <input
          className="border p-2 w-full"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          className="border p-2 w-full"
          placeholder="Lastname"
          value={formData.lastname}
          onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
          required
        />
        <input
          className="border p-2 w-full"
          placeholder="License Number"
          value={formData.licenseNumber}
          onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
          required
        />
        <input
          className="border p-2 w-full"
          placeholder="Role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          required
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Create Driver
        </button>
      </form>
      <button
        onClick={() => navigate('/admin/Drivers')}
        className="mt-6 text-blue-600 text-lg font-bold hover:underline"
      >
        ← Back
      </button>
    </div>
  );
};

export default CreateDriverPage;