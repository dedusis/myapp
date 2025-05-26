import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../style/AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); 

  const handleLogout = () => {
    logout();
    navigate('/login'); 
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4 font-semibold">Admin Dashboard</h2>

      <div className="space-y-2">
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded w-full sm:w-auto"
          onClick={() => navigate('/admin/drivers')}
        >
          Manage Drivers
        </button>

        <button
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded w-full sm:w-auto"
          onClick={() => navigate('/admin/trucks')}
        >
          Manage Trucks
        </button>

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full sm:w-auto"
          onClick={() => navigate('/admin/assign-truck')}
        >
          Assign Truck to Driver
        </button>
      </div>

      <div className="mt-8">
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded w-full sm:w-auto"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;