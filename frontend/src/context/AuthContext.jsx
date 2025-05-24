// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getProfile } from '../services/api';

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const profile = await getProfile(token);
          setUser(profile);
        } catch (e) {
          console.error('Profile load failed', e);
          setUser(null);
        }
      }
      setLoading(false); 
    };
    loadUser();
  }, [token]);

  const login = async (newToken) => {
  localStorage.setItem('token', newToken);
  setToken(newToken);
  try {
    const profile = await getProfile(newToken);
    setUser(profile);
    localStorage.setItem('user', JSON.stringify(profile));
    return profile;  
  } catch (err) {
    console.error('Failed to fetch profile:', err);
    setUser(null);
    return null;
  }
};


  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken('');
    setUser(null);
  };

  const value = { user, token, login, logout, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
