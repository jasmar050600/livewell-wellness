// C:\Users\jasma\OneDrive\Desktop\Livewell Wellness\Livewell\src\config\axios.js

import axios from 'axios';
import apiConfig from './api';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:1337',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add a request interceptor
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

export default axiosInstance;