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
    
    <h1 className="text-4xl font-bold text-center text-white mb-6">TransitPro</h1>

    <h2 className="text-2xl mb-4 font-semibold">Admin Dashboard</h2>

    <div className="space-y-2">
      <button
        className="bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded w-full sm:w-auto"
        onClick={() => navigate('/admin/drivers')}
      >
        Manage Drivers
      </button>

      <button
        className="bg-green-600 hover:bg-green-600 text-white py-2 px-4 rounded w-full sm:w-auto"
        onClick={() => navigate('/admin/trucks')}
      >
        Manage Trucks
      </button>

      <button
        className="bg-blue-600 hover:bg-blue-600 text-white  text-lg font-medium font-bold py-2 px-4 rounded w-full sm:w-auto"
        onClick={() => navigate('/admin/assign-truck')}
      >
        Assign Truck to Driver 
      </button>
    </div>

    <div className="mt-8">
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white text-xl py-2 px-4 rounded w-full sm:w-auto flex items-center justify-center gap-2"
      >
        <span>Logout</span>
        <img src="/images/logout.png" alt="logout" className="w-5 h-5" />
      </button>
    </div>
  </div>
);
}
export default AdminDashboard;