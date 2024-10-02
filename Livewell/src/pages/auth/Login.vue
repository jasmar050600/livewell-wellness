<template>
  <div class="auth-container">
    <h2 class="auth-title">Login</h2>
    <form @submit.prevent="loginUser" class="auth-form">
      <div class="form-group">
        <label for="identifier">Email or Phone Number:</label>
        <input 
          type="text" 
          id="identifier" 
          v-model="identifier" 
          required
          placeholder="Enter your email or phone number"
        >
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input 
          type="password" 
          id="password" 
          v-model="password" 
          required
          placeholder="Enter your password"
        >
      </div>
      <button type="submit" class="auth-button" :disabled="isLoading">
        {{ isLoading ? 'Logging in...' : 'Login' }}
      </button>
    </form>
    <p v-if="error" class="error-message">{{ error }}</p>
    <p class="auth-link">
      Don't have an account? <router-link to="/auth/register">Register here</router-link>
    </p>
    <p class="auth-link">
      <router-link to="/auth/forgot-password">Forgot Password?</router-link>
    </p>
  </div>
</template>

<script>
import axiosInstance from '@/config/axios';
import apiConfig from '@/config/api';

export default {
  name: 'Login',
  data() {
    return {
      identifier: '',
      password: '',
      error: null,
      isLoading: false
    }
  },
  methods: {
    async loginUser() {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await axiosInstance.post(apiConfig.LOGIN_URL, {
          identifier: this.identifier,
          password: this.password
        });
        
        localStorage.setItem('token', response.data.jwt);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        this.$router.push('/dashboard');
      } catch (error) {
        this.handleError(error);
      } finally {
        this.isLoading = false;
      }
    },
    handleError(error) {
      console.error('Login error:', error);
      
      if (error.response) {
        switch (error.response.status) {
          case 400:
            this.error = 'Invalid credentials. Please check your email/phone and password.';
            break;
          case 429:
            this.error = 'Too many attempts. Please try again later.';
            break;
          default:
            this.error = error.response.data?.error?.message || 'An error occurred during login';
        }
      } else if (error.request) {
        this.error = 'No response from server. Please check your connection.';
      } else {
        this.error = 'An error occurred while sending the request.';
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

.auth-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  font-family: 'Times New Roman', sans-serif;
}

.auth-title {
  text-align: center;
  color: #4a0e4e;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-family: 'Times New Roman', Times, serif;
  font-weight: 300;
}

.auth-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
  color: #333333;
  background-color: #f5f5f5;
}

input::placeholder {
  color: #999999;
}

input:focus {
  outline: none;
  border-color: #4a0e4e;
  box-shadow: 0 0 0 2px rgba(74, 14, 78, 0.2);
}

.auth-button {
  background-color: #4a0e4e;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.auth-button:hover {
  background-color: #3a0b3e;
}

.auth-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.auth-link {
  text-align: center;
  margin-top: 1rem;
  color: #2c3e50;
}

.auth-link a {
  color: #4a0e4e;
  text-decoration: none;
}

.auth-link a:hover {
  text-decoration: underline;
}

.error-message {
  color: #e74c3c;
  text-align: center;
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: #fde8e8;
  border-radius: 4px;
}
</style>