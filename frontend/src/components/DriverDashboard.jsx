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
<h1 className="text-4xl font-bold text-center text-white mb-6">TransitPro</h1>

      <h2 className="text-2xl font-bold mb-4">Welcome, {user?.username}</h2>

      <div className="space-y-4">
        <button
          onClick={() => navigate('/driver/my-truck')}
          className="bg-blue-600 text-white  text-lg font-bold px-4 py-2 rounded w-full"
        >
          My Truck
        </button>

        <button
          onClick={() => navigate('/driver/update-truck')}
          className="bg-green-500 text-white text-lg font-bold px-4 py-2 rounded w-full"
        >
          Update Truck
        </button>
      </div>

      <div className="mt-8">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white   text-lg font-bold px-4 py-2 rounded w-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default DriverDashboard;