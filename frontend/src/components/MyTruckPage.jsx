import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MyTruckPage = () => {
  const { token } = useAuth();
  const [truck, setTruck] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTruck = async () => {
      const res = await fetch('http://localhost:5000/truck/my-truck', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setTruck(data);
      setLoading(false);
    };
    fetchTruck();
  }, [token]);

  if (loading) return <p>Loading...</p>;
  if (!truck) return <p>No truck assigned.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Truck</h2>
      <p><strong>ID:</strong> {truck._id}</p>
      <p><strong>Plate Number:</strong> {truck.plateNumber}</p>
      <p><strong>Brand:</strong> {truck.brand}</p>
      <p><strong>Model:</strong> {truck.model}</p>
      <p><strong>Year:</strong> {truck.year}</p>
      <p><strong>Mileage:</strong> {truck.mileage}</p>
      <p><strong>Last Maintenance:</strong> {truck.lastMaintenance
        ? new Date(truck.lastMaintenance).toLocaleDateString('el-GR')
        : 'Not set'}
      </p>
      <button
        onClick={() => navigate('/driver')}
        className="text-blue-600 hover:underline mb-4"
      >
        ← Back
      </button>
    </div>
  );
};

export default MyTruckPage;