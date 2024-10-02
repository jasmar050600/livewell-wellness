<template>
    <div class="shopping-cart-container">
      <h1 class="shopping-cart-title">Your Shopping Cart</h1>
      <div class="shopping-cart-content">
        <div v-if="cartItems.length === 0" class="empty-cart">
          <p>Your cart is empty. Start shopping now!</p>
          <button @click="goToShop" class="cart-button">Go to Shop</button>
        </div>
        <div v-else>
          <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
            <img :src="item.image" :alt="item.name" class="item-image">
            <div class="item-details">
              <h3>{{ item.name }}</h3>
              <p>Price: ${{ item.price.toFixed(2) }}</p>
              <div class="quantity-control">
                <button @click="decreaseQuantity(index)" class="quantity-button">-</button>
                <span>{{ item.quantity }}</span>
                <button @click="increaseQuantity(index)" class="quantity-button">+</button>
              </div>
            </div>
            <button @click="removeItem(index)" class="remove-button">Remove</button>
          </div>
          <div class="cart-summary">
            <h2>Total: ${{ cartTotal.toFixed(2) }}</h2>
            <button @click="checkout" class="cart-button">Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ShoppingCart',
    data() {
      return {
        cartItems: [
          { name: 'Organic Green Tea', price: 12.99, quantity: 1, image: '/api/placeholder/80/80' },
          { name: 'Yoga Mat', price: 29.99, quantity: 1, image: '/api/placeholder/80/80' },
          { name: 'Meditation Cushion', price: 39.99, quantity: 2, image: '/api/placeholder/80/80' },
        ]
      }
    },
    computed: {
      cartTotal() {
        return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      }
    },
    methods: {
      increaseQuantity(index) {
        this.cartItems[index].quantity++;
      },
      decreaseQuantity(index) {
        if (this.cartItems[index].quantity > 1) {
          this.cartItems[index].quantity--;
        }
      },
      removeItem(index) {
        this.cartItems.splice(index, 1);
      },
      goToShop() {
        // Implement navigation to shop page
        console.log('Navigating to shop');
      },
      checkout() {
        // Implement checkout process
        console.log('Proceeding to checkout');
      }
    }
  }
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');
  
  .shopping-cart-container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    font-family: 'Times New Roman', sans-serif;
  }
  
  .shopping-cart-title {
    text-align: center;
    color: #4a0e4e;
    font-size: 2.5rem;
    margin-bottom: 2rem;
    font-family: 'Times New Roman', Times, serif;
    font-weight: 300;
  }
  
  .shopping-cart-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .cart-item {
    display: flex;
    align-items: center;
    background-color: #f5f5f5;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  
  .item-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 4px;
    margin-right: 1rem;
  }
  
  .item-details {
    flex-grow: 1;
  }
  
  .item-details h3 {
    color: #4a0e4e;
    margin-bottom: 0.5rem;
  }
  
  .quantity-control {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
  
  .quantity-button, .remove-button, .cart-button {
    background-color: #4a0e4e;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .quantity-button {
    padding: 0.25rem 0.5rem;
  }
  
  .remove-button {
    background-color: #ff4136;
  }
  
  .quantity-button:hover, .remove-button:hover, .cart-button:hover {
    background-color: #3a0b3e;
  }
  
  .remove-button:hover {
    background-color: #dc352d;
  }
  
  .cart-summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 2px solid #e0e0e0;
  }
  
  .empty-cart {
    text-align: center;
    color: #2c3e50;
  }
  
  .empty-cart p {
    margin-bottom: 1rem;
  }
  </style>