<template>
  <header class="header">
    <div class="header-content">
      <div class="left-section">
        <div class="company-name">LiveWell Marketing Corp.</div>
      </div>
      <router-link to="/home" class="logo-link">
        <h1 class="logo">Live Wellness</h1>
      </router-link>
      <div class="right-section">
        <nav class="main-nav">
          <div class="nav-item-container">
            <a href="#" @click.prevent="toggleShopDropdown" class="nav-item">
              Shop
              <span class="dropdown-arrow" :class="{ 'rotate': isShopDropdownOpen }">▼</span>
            </a>
            <div v-if="isShopDropdownOpen" class="dropdown-content">
              <a href="#" @click.prevent="handleLinkClick">Our Products</a>
              <a href="#" @click.prevent="handleLinkClick">View Cart</a>
            </div>
          </div>
          <div class="nav-item-container">
            <a href="#" @click.prevent="toggleAccountDropdown" class="nav-item">
              Account
              <span class="dropdown-arrow" :class="{ 'rotate': isAccountDropdownOpen }">▼</span>
            </a>
            <div v-if="isAccountDropdownOpen" class="dropdown-content">
              <template v-if="!isLoggedIn">
                <router-link to="/auth/register" @click="handleLinkClick">Register</router-link>
                <router-link to="/auth/login" @click="handleLinkClick">Login</router-link>
              </template>
              <template v-else>
                <router-link to="/dashboard" @click="handleLinkClick">Dashboard</router-link>
                <a href="#" @click.prevent="logout">Logout</a>
              </template>
            </div>
          </div>
        </nav>
      </div>
      <div v-if="isLoggedIn && user" class="user-greeting">
        {{ greeting }} {{ user.username }}
      </div>
    </div>
  </header>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  name: 'GlobalHeader',
  setup() {
    const user = ref(null);
    const isLoggedIn = ref(false);
    const router = useRouter();

    const greeting = computed(() => {
      const hour = new Date().getHours();
      if (hour < 12) return 'Good Morning';
      if (hour < 18) return 'Good Afternoon';
      return 'Good Evening';
    });

    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axiosInstance.get('/api/users/me');
          console.log('User data response:', response.data);

          user.value = response.data;
          isLoggedIn.value = true;
        } catch (error) {
          console.error('Error fetching user data:', error);
          localStorage.removeItem('token');
          isLoggedIn.value = false;
          user.value = null;
        }
      } else {
        isLoggedIn.value = false;
        user.value = null;
      }
    };

    const logout = () => {
      localStorage.removeItem('token');
      isLoggedIn.value = false;
      user.value = null;
      router.push('/');
    };

    onMounted(fetchUserData);

    watch(() => router.currentRoute.value.path, fetchUserData);

    return {
      user,
      isLoggedIn,
      greeting,
      logout,
      router
    };
  },
  data() {
    return {
      isShopDropdownOpen: false,
      isAccountDropdownOpen: false,
    };
  },
  methods: {
    toggleShopDropdown() {
      this.isShopDropdownOpen = !this.isShopDropdownOpen;
      this.isAccountDropdownOpen = false;
    },
    toggleAccountDropdown() {
      this.isAccountDropdownOpen = !this.isAccountDropdownOpen;
      this.isShopDropdownOpen = false;
    },
    closeDropdowns() {
      this.isAccountDropdownOpen = false;
      this.isShopDropdownOpen = false;
    },
    handleLinkClick() {
      this.closeDropdowns();
      this.$emit('link-clicked');
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

.header {
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  padding: 0.75rem 2rem;
  font-family: 'Poppins', sans-serif;
  position: relative;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-section,
.right-section {
  flex: 1;
  display: flex;
  align-items: center;
}

.right-section {
  justify-content: flex-end;
}

.company-name {
  font-size: 0.9rem;
  font-weight: 400;
  color: #4a4a4a;
}

.logo-container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 10;

}

.logo-link {
  text-decoration: none;
}

.logo {
  font-size: 3.5rem;
  font-weight: 300;
  margin: 0;
  color: #2c3e50;
  font-family: 'Times New Roman', serif;
  white-space: nowrap;
  margin-left: 150px;
}

.user-greeting {
  font-size: 0.9rem;
  color: #4a4a4a;
  white-space: nowrap;
}

.main-nav {
  display: flex;
}

.nav-item-container {
  position: relative;
  margin-right: 1.5rem;
}

.nav-item {
  text-decoration: none;
  color: #2c3e50;
  font-weight: 400;
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
}

.nav-item:hover {
  color: #1a252f;
}

.dropdown-arrow {
  font-size: 0.7rem;
  margin-left: 0.25rem;
  transition: transform 0.3s ease;
}

.rotate {
  transform: rotate(180deg);
}

.dropdown-content {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 0.5rem 0;
  z-index: 1000;
  min-width: 150px;
}

.dropdown-content a {
  display: block;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: #2c3e50;
  transition: background-color 0.3s ease;
}

.dropdown-content a:hover {
  background-color: #f5f5f5;
}

@media (max-width: 1024px) {
  .header {
    padding: 0.75rem 1rem;
  }

  .company-name {
    display: none;
  }

  .logo {
    font-size: 2rem;
  }

  .nav-item-container {
    margin-right: 1rem;
  }

  .user-greeting {
    font-size: 0.8rem;
  }
}

@media (max-width: 768px) {
  .header {
    flex-wrap: wrap;
    justify-content: center;
    padding: 0.5rem;
  }

  .logo-container {
    position: static;
    transform: none;
    order: -1;
    width: 100%;
    text-align: center;
    margin-bottom: 0.5rem;
  }

  .header-content {
    width: 100%;
    justify-content: space-between;
  }

  .main-nav {
    order: 1;
  }

  .right-section {
    order: 2;
  }

  .nav-item-container {
    margin-right: 0.5rem;
  }

  .user-greeting {
    font-size: 0.7rem;
  }
}
</style>