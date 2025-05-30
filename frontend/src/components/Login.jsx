import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/api';
import '../style/login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(username, password);
      if (data.token) {
        const user = await login(data.token); 
        navigate(user.role === 'admin' ? '/admin' : '/driver');
      } else {
        alert('Λάθος username ή password');
      }
    } catch (error) {
      console.error('Σφάλμα στο login:', error);
      alert('Πρόβλημα κατά το login, δοκίμασε ξανά');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 p-4 border rounded">
      <h2 className="text-2xl font-bold text-center mt-8 mb-6">TransitPro</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="w-full  text-xl p-2 mb-3 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full text-xl p-2 mb-4 border rounded"
      />
      <button type="submit" className="w-full bg-blue-600 text-xl font-bold text-white mt-4 p-2 rounded">Login</button>
    </form>
  );
};

export default Login;
