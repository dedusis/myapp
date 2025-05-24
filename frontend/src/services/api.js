const API_URL = 'http://localhost:5000';

export const loginUser = async (username, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
};

export const getProfile = async (token) => {
  const res = await fetch(`${API_URL}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const apiRequest = async (endpoint, method = 'GET', token, data) => {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  if (data) config.body = JSON.stringify(data);
  const res = await fetch(`${API_URL}${endpoint}`, config);
  return res.json();
};