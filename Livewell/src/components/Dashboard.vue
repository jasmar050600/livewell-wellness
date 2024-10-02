<template>
    <div class="dashboard-container">
      <h1 class="dashboard-title">User Dashboard</h1>
      <div class="dashboard-content">
        <div class="dashboard-card">
          <h2>Quick Actions</h2>
          <button @click="showProducts" class="dashboard-button">View Products</button>
          <button @click="showWellnessServices" class="dashboard-button">Check Wellness Services</button>
          <button @click="showPurchaseHistory" class="dashboard-button">View Purchase History</button>
          <button @click="showRecentSearches" class="dashboard-button">View Recent Searches</button>
        </div>
      </div>
  
      <!-- Products Popup -->
      <transition name="fade">
        <div v-if="isProductsVisible" class="popup-overlay" @click.self="closeProducts">
          <transition name="slide-fade">
            <div v-if="isProductsVisible" class="popup-content">
              <h2>Our Products</h2>
              <ul class="item-list">
                <li v-for="product in products" :key="product.id" class="item">
                  <img :src="product.image" :alt="product.name" class="product-image">
                  <h3>{{ product.name }}</h3>
                  <p>{{ product.description }}</p>
                  <span class="price">{{ product.price }}</span>
                </li>
              </ul>
              <button @click="closeProducts" class="close-button">Close</button>
            </div>
          </transition>
        </div>
      </transition>
  
      <!-- Wellness Services Popup -->
      <transition name="fade">
        <div v-if="isWellnessServicesVisible" class="popup-overlay" @click.self="closeWellnessServices">
          <transition name="slide-fade">
            <div v-if="isWellnessServicesVisible" class="popup-content">
              <h2>Wellness Services</h2>
              <ul class="item-list">
                <li v-for="service in wellnessServices" :key="service.id" class="item">
                  <h3>{{ service.name }}</h3>
                  <p>{{ service.description }}</p>
                  <span class="price">{{ service.price }}</span>
                </li>
              </ul>
              <button @click="closeWellnessServices" class="close-button">Close</button>
            </div>
          </transition>
        </div>
      </transition>
  
      <!-- Purchase History Popup -->
      <transition name="fade">
        <div v-if="isPurchaseHistoryVisible" class="popup-overlay" @click.self="closePurchaseHistory">
          <transition name="slide-fade">
            <div v-if="isPurchaseHistoryVisible" class="popup-content">
              <h2>Purchases History</h2>
              <ul class="item-list">
                <li v-for="purchase in purchaseHistory" :key="purchase.id" class="item">
                  <h3>{{ purchase.product }}</h3>
                  <p>Purchased on: {{ purchase.date }}</p>
                  <span class="price">{{ purchase.price }}</span>
                </li>
              </ul>
              <button @click="closePurchaseHistory" class="close-button">Close</button>
            </div>
          </transition>
        </div>
      </transition>
  
      <!-- Recent Searches Popup -->
      <transition name="fade">
        <div v-if="isRecentSearchesVisible" class="popup-overlay" @click.self="closeRecentSearches">
          <transition name="slide-fade">
            <div v-if="isRecentSearchesVisible" class="popup-content">
              <h2>Recent Searches</h2>
              <ul class="item-list">
                <li v-for="(search, index) in recentSearches" :key="index" class="item">
                  <h3>Search {{ index + 1 }}</h3>
                  <p>{{ search }}</p>
                </li>
              </ul>
              <button @click="closeRecentSearches" class="close-button">Close</button>
            </div>
          </transition>
        </div>
      </transition>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Dashboard',
    data() {
      return {
        products: [
          { 
            id: 1, 
            name: 'PharmaZinc Vitamin C', 
            description: 'High-potency Vitamin C supplement', 
            price: '₱750.00',
            image: 'src/images/pharmazinc-bottle.jpg'
          },
          { 
            id: 2, 
            name: 'PharmaZinc Trial Pack', 
            description: 'Sample pack of our best-selling supplements', 
            price: '₱500.00',
            image: 'src/images/trial-package.jpg'
          },
          { 
            id: 3, 
            name: 'Starlite Package', 
            description: 'Comprehensive wellness package for beginners', 
            price: '₱1,500.00',
            image: 'src/images/starlite-package.png'
          },
          { 
            id: 4, 
            name: 'Elite Package', 
            description: 'Premium wellness package for optimal health', 
            price: '₱4,500.00',
            image: 'src/images/elite-package.png'
          },
          { 
            id: 5, 
            name: 'Executive Package', 
            description: 'Exclusive wellness package for high-performance individuals', 
            price: '₱6,000.00',
            image: 'src/images/executive-package.png'
          },
          { 
            id: 6, 
            name: 'Director Package', 
            description: 'Comprehensive wellness solution for corporate leaders', 
            price: '₱8,000.00',
            image: 'src/images/director-package.png'
          },
        ],
        wellnessServices: [
          { id: 1, name: 'Nutritional Consultation', description: 'One-on-one session with a certified nutritionist', price: '₱2,000.00' },
          { id: 2, name: 'Fitness Assessment', description: 'Comprehensive fitness evaluation and personalized plan', price: '₱1,500.00' },
          { id: 3, name: 'Stress Management Workshop', description: 'Group session on effective stress reduction techniques', price: '₱1,000.00' },
          { id: 4, name: 'Holistic Health Retreat', description: 'Weekend retreat focusing on mind-body wellness', price: '₱8,000.00' },
        ],
        purchaseHistory: [
          { id: 1, product: 'PharmaZinc Vitamin C', date: '2024-09-30', price: '₱750.00' },
          { id: 2, product: 'PharmaZinc Trial Pack', date: '2024-09-28', price: '₱500.00' },
          { id: 3, product: 'Starlite Package', date: '2024-09-15', price: '₱1,500.00' },
          { id: 4, product: 'Elite Package', date: '2024-08-30', price: '₱4,500.00' },
        ],
        recentSearches: [
          'PharmaZinc Vitamin C benefits',
          'PharmaZinc benefits',
          'Starlite Package vs Elite Package',
          'LiveWell Marketing wellness services',
          'Executive Package details',
        ],
        isProductsVisible: false,
        isWellnessServicesVisible: false,
        isPurchaseHistoryVisible: false,
        isRecentSearchesVisible: false,
      }
    },
    methods: {
      showProducts() {
        this.isProductsVisible = true;
      },
      closeProducts() {
        this.isProductsVisible = false;
      },
      showWellnessServices() {
        this.isWellnessServicesVisible = true;
      },
      closeWellnessServices() {
        this.isWellnessServicesVisible = false;
      },
      showPurchaseHistory() {
        this.isPurchaseHistoryVisible = true;
      },
      closePurchaseHistory() {
        this.isPurchaseHistoryVisible = false;
      },
      showRecentSearches() {
        this.isRecentSearchesVisible = true;
      },
      closeRecentSearches() {
        this.isRecentSearchesVisible = false;
      }
    }
  }
  </script>
  
  <style scoped>
  .dashboard-container {
    max-width: 900px;
    margin: 2rem auto;
    padding: 2rem;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    font-family: 'Times New Roman', sans-serif;
    color: #ffa500;
  }
  
  .dashboard-title {
    text-align: center;
    color: #4a0e4e;
    font-size: 2.5rem;
    margin-bottom: 2rem;
    font-weight: 300;
  }
  
  .dashboard-content {
    display: flex;
    justify-content: center;
  }
  
  .dashboard-card {
    background-color: #f5f5f5;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    width: 100%;
    max-width: 500px;
  }
  
  .dashboard-card h2 {
    color: #4a0e4e;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    font-weight: 400;
    text-align: center;
  }
  
  .dashboard-button {
    background-color: #4a0e4e;
    color: white;
    border: none;
    padding: 1rem;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 1rem;
    width: 100%;
    font-weight: bolder;
  }
  
  .dashboard-button:hover {
    background-color: #3a0b3e;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  
  .dashboard-button:active {
    transform: translateY(0);
    box-shadow: 0 2px 3px rgba(0,0,0,0.1);
  }
  
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .popup-content {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    max-width: 600px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
  }
  
  .popup-content h2 {
    color: #4a0e4e;
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  
  .item-list {
    list-style-type: none;
    padding: 0;
  }
  
  .item {
    margin-bottom: 1.5rem;
    padding: 1rem;
    background-color: #f8f8f8;
    border-radius: 4px;
    transition: all 0.3s ease;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  
  .item:hover {
    background-color: #e8e8e8;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  
  .item h3 {
    margin: 0 0 0.5rem 0;
    color: #4a0e4e;
    font-size: 1.2rem;
  }
  
  .item p {
    margin: 0 0 0.5rem 0;
    color: #2c3e50;
  }
  
  .price {
    display: block;
    font-weight: bold;
    color: #4a0e4e;
    font-size: 1.1rem;
  }
  
  .close-button {
    background-color: #4a0e4e;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 1rem;
    display: block;
    width: 100%;
  }
  
  .close-button:hover {
    background-color: #3a0b3e;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  
  .close-button:active {
    transform: translateY(0);
    box-shadow: 0 2px 3px rgba(0,0,0,0.1);
  }
  
  /* Fade transition for overlay */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  
  /* Slide and fade transition for popup content */
  .slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }
  .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateY(-20px);
    opacity: 0;
  }
  
  /* New style for product images */
  .product-image {
    width: 100%;
    height: auto;
    border-radius: 4px;
    margin-bottom: 1rem;
  }
  </style>