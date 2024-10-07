// src/config/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

export default {
  LOGIN_URL: `${API_BASE_URL}/api/auth/local`,
  REGISTER_URL: `${API_BASE_URL}/api/auth/local/register`,
  FORGOT_PASSWORD_URL: `${API_BASE_URL}/api/auth/forgot-password`,
  RESET_PASSWORD_URL: `${API_BASE_URL}/api/auth/reset-password`,
  
  getAuthHeader: (token) => ({
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
};