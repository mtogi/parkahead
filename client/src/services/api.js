import axios from 'axios';
import { auth } from '../firebase';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const parkingSpotService = {
  getAll: () => api.get('/parking-spots'),
  getNearby: (lng, lat, maxDistance) => 
    api.get(`/parking-spots/near?lng=${lng}&lat=${lat}&maxDistance=${maxDistance}`),
  getById: (id) => api.get(`/parking-spots/${id}`),
  create: (data) => api.post('/parking-spots', data),
  update: (id, data) => api.put(`/parking-spots/${id}`, data),
  delete: (id) => api.delete(`/parking-spots/${id}`)
};

export const reservationService = {
  create: (data) => api.post('/reservations', data),
  getUserReservations: (userId) => api.get(`/reservations/user/${userId}`),
  updateStatus: (id, status) => api.patch(`/reservations/${id}/status`, { status })
};

export default api; 