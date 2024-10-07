// src/config/api.js
const API_BASE_URL = 'https://livewell-wellness.onrender.com';

export default {
  LOGIN_URL: `${API_BASE_URL}/api/auth/local`,
  REGISTER_URL: `${API_BASE_URL}/api/auth/local/register`,
  FORGOT_PASSWORD_URL: `${API_BASE_URL}/api/auth/forgot-password`,
  RESET_PASSWORD_URL: `${API_BASE_URL}/api/auth/reset-password`,
  USER_ME_URL: `${API_BASE_URL}/api/users/me`,  // Add this line
  
  getAuthHeader: (token) => ({
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
};