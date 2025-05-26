import { apiRequest } from './api';

// GET /truck/my-truck
export const getMyTruck = (token) => {
  return apiRequest('/truck/my-truck', 'GET', token);
};

// PATCH /truck/my-truck
export const updateMyTruck = (token, data) => {
  return apiRequest('/truck/my-truck', 'PATCH', token, data);
};