import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DriverDashboard = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Welcome, {user?.username}</h2>

      <div className="space-y-4">
        <button
          onClick={() => navigate('/driver/my-truck')}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          My Truck
        </button>

        <button
          onClick={() => navigate('/driver/update-truck')}
          className="bg-green-500 text-white px-4 py-2 rounded w-full"
        >
          Update Truck
        </button>
      </div>

      <div className="mt-8">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded w-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default DriverDashboard;