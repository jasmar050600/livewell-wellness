// C:\Users\jasma\OneDrive\Desktop\Livewell Wellness\Livewell\src\config\api.js

const API_BASE_URL = 'http://localhost:1337';

export default {
  LOGIN_URL: `${API_BASE_URL}/api/auth/local`,
  REGISTER_URL: `${API_BASE_URL}/api/auth/local/register`,
  
  // Add any other API endpoints you might need
  FORGOT_PASSWORD_URL: `${API_BASE_URL}/api/auth/forgot-password`,
  RESET_PASSWORD_URL: `${API_BASE_URL}/api/auth/reset-password`,
  
  // Helper function to get authentication header
  getAuthHeader: (token) => ({
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
};