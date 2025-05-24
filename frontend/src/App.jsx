import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import DriverDashboard from './components/DriverDashboard';
import DriversManagement from './components/DriversManagement';
import TrucksManagement from './components/TrucksManagement';
import CreateDriverPage from './components/CreateDriverPage';
import CreateTruckPage from './components/CreateTruckPage'; 
import AssignTruckPage from './components/AssignTruckPage';
import MyTruckPage from './components/MyTruckPage'; 
import UpdateMyTruckPage from './components/UpdateMyTruckPage';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* ADMIN ROUTES */}
      <Route
        path="/admin"
        element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/admin/drivers"
        element={user?.role === 'admin' ? <DriversManagement /> : <Navigate to="/login" />}
      />
      <Route
        path="/admin/trucks"
        element={user?.role === 'admin' ? <TrucksManagement /> : <Navigate to="/login" />}
      />
      <Route
        path="/admin/create-driver"
        element={user?.role === 'admin' ? <CreateDriverPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/admin/create-truck"
        element={user?.role === 'admin' ? <CreateTruckPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/admin/assign-truck"
        element={user?.role === 'admin' ? <AssignTruckPage /> : <Navigate to="/login" />}
      />

      {/* DRIVER ROUTES */}
      <Route
        path="/driver"
        element={user?.role === 'driver' ? <DriverDashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/driver/my-truck"
        element={user?.role === 'driver' ? <MyTruckPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/driver/update-truck"
        element={user?.role === 'driver' ? <UpdateMyTruckPage /> : <Navigate to="/login" />}
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
