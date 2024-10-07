// src/config/axios.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Add timeout
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.code === 'ERR_NETWORK') {
      console.error('Network error occurred');
      // Handle network error (e.g., API is down)
    } else if (error.response?.status === 403) {
      console.error('CORS error might have occurred');
      // Handle CORS error
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;