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
      <h2 className="text-2xl font-bold mb-4">My Truck</h2>
      <p className='text-lg font-bold'><strong>ID:</strong> {truck._id}</p>
      <p className='text-lg font-bold'><strong>Plate Number:</strong> {truck.plateNumber}</p>
      <p className='text-lg font-bold'><strong>Brand:</strong> {truck.brand}</p>
      <p className='text-lg font-bold'><strong>Model:</strong> {truck.model}</p>
      <p className='text-lg font-bold'><strong>Year:</strong> {truck.year}</p>
      <p className='text-lg font-bold'><strong>Mileage:</strong> {truck.mileage}</p>
      <p className='text-lg font-bold'><strong>Last Maintenance:</strong> {truck.lastMaintenance
        ? new Date(truck.lastMaintenance).toLocaleDateString('el-GR')
        : 'Not set'}
      </p>
      <button
        onClick={() => navigate('/driver')}
        className="text-blue-600 text-lg font-bold hover:underline mb-4"
      >
        ← Back
      </button>
    </div>
  );
};

export default MyTruckPage;