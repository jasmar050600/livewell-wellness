<template>
  <div class="auth-container">
    <h2 class="auth-title">Register</h2>
    <form @submit.prevent="registerUser" class="auth-form">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <div class="phone-otp-group">
        <label for="phoneNumber">Phone Number:</label>
        <div class="phone-otp-wrapper">
          <input type="tel" id="phoneNumber" v-model="phoneNumber" required>
          <button @click.prevent="sendOTP" class="send-otp-button" :disabled="otpSent">
            {{ otpSent ? 'OTP Sent' : 'Send OTP' }}
          </button>
        </div>
      </div>
      <div v-if="otpSent" class="form-group">
        <label for="otp">OTP:</label>
        <input type="text" id="otp" v-model="otp" required>
      </div>
      <button type="submit" class="auth-button" :disabled="isLoading">
        {{ isLoading ? 'Registering...' : 'Register' }}
      </button>
    </form>
    <p v-if="error" class="error-message">{{ error }}</p>
    <p class="auth-link">
      Already have an account? <router-link to="/auth/login">Login here</router-link>
    </p>
  </div>
</template>

<script>
import axiosInstance from '@/config/axios';
import apiConfig from '@/config/api';

export default {
  name: 'Register',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      phoneNumber: '',
      otp: '',
      otpSent: false,
      error: null,
      isLoading: false
    }
  },
  methods: {
    async sendOTP() {
      try {
        // Implement OTP sending logic here
        this.otpSent = true;
      } catch (error) {
        this.handleError(error);
      }
    },
    async registerUser() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axiosInstance.post(apiConfig.REGISTER_URL, {
          username: this.username,
          email: this.email,
          password: this.password,
          phoneNumber: this.phoneNumber,
          // Include OTP if it's implemented
          // otp: this.otp
        });
        
        console.log('Registration successful:', response.data);
        localStorage.setItem('token', response.data.jwt);
        this.$router.push('/dashboard');
      } catch (error) {
        this.handleError(error);
      } finally {
        this.isLoading = false;
      }
    },
    handleError(error) {
    console.error('Registration error:', error);
    if (error.response) {
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
      console.error('Error response data:', JSON.stringify(error.response.data, null, 2));
      
      if (error.response.data && error.response.data.error) {
        if (typeof error.response.data.error === 'string') {
          this.error = error.response.data.error;
        } else if (error.response.data.error.message) {
          this.error = error.response.data.error.message;
        } else {
          this.error = 'An unexpected error occurred during registration';
        }
      } else {
        this.error = `Server error: ${error.response.status}`;
      }
    } else if (error.request) {
      console.error('Error request:', error.request);
      this.error = 'No response from server. Please check your connection.';
    } else {
      console.error('Error message:', error.message);
      this.error = 'An error occurred while sending the request.';
    }
  },

  async registerUser() {
  this.isLoading = true;
  this.error = null;
  try {
    const registrationData = {
      username: this.username,
      email: this.email,
      password: this.password,
      // phonenumber field removed
    };

    console.log('Sending registration data:', JSON.stringify(registrationData, null, 2));

    const response = await axiosInstance.post(apiConfig.REGISTER_URL, registrationData);
    
    console.log('Registration successful:', response.data);
    localStorage.setItem('token', response.data.jwt);
    this.$router.push('/dashboard');
  } catch (error) {
    this.handleError(error);
  } finally {
    this.isLoading = false;
  }
},
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
  margin-bottom: 1rem;
  font-family: 'Times New Roman', Times, serif;
  font-weight: 300;
}

.auth-subtitle {
  text-align: center;
  color: #4a0e4e;
  font-size: 1rem;
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

input, select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
  color: #2c3e50;
  background-color: #f5f5f5;
}

input::placeholder {
  color: #999999;
}

input:focus, select:focus {
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
  margin-top: 1rem;
}

.auth-button:hover {
  background-color: #3a0b3e;
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

.phone-otp-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 15px;
}

.phone-otp-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
}

#phoneNumber {
  flex-grow: 1;
  margin-right: 10px;
}

.send-otp-button {
  padding: 0.75rem;
  background-color: #5a2a7b;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.send-otp-button:hover {
  background-color: #70348c;
}

.send-otp-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}


</style>