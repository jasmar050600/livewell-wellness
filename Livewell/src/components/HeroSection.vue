<template>
    <section class="hero-section">
      <div class="left-content">
        <h2 class="hero-title">Discover a<br>Healthier<br>Lifestyle Today</h2>
        <div class="product-showcase">
          <img src="@/images/pharmazinc-bottle.jpg" alt="PharmaZinc Supplement" class="product-image" />
        </div>
      </div>
      <div class="right-content">
        <div class="mission-overlay">
        </div>
        <div class="image-grid">
          <img src="@/images/mission-main.png" alt="Wellness Mission Main" class="main-image" />
          <img src="@/images/mission-1.png" alt="Wellness Mission 1" class="small-image" />
          <img src="@/images/mission-2.png" alt="Wellness Mission 1" class="small-image" />
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'HeroSection',
  }
  </script>
  
  <style scoped>
  .hero-section {
    display: flex;
    min-height: 600px;
    background: linear-gradient(to right, #e6f0a3 0%, #ffa500 100%);
  }
  
  .left-content, .right-content {
    flex: 1;
    padding: 2rem;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .hero-title {
    font-family: 'Times New Roman', serif;
    font-size: 3.5rem;
    color: #333;
    line-height: 1.2;
    margin-bottom: 2rem;
    font-weight: 300;
  }
  
  .product-showcase {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .product-image {
    max-width: 80%;
    height: auto;
    filter: drop-shadow(0 10px 10px rgba(0,0,0,0.2));
  }
  
  .right-content {
    background-color: #ffa500;
    overflow: hidden;
  }
  
  .mission-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-color: rgba(255, 165, 0, 0.8);
    padding: 1rem;
  }
  
  .mission-title {
    font-family: Arial, sans-serif;
    color: white;
    font-size: 3rem;
    text-align: center;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
    font-weight: bold;
    letter-spacing: 2px;
  }
  
  .image-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-top: 4rem;
  }
  
  .main-image {
    grid-column: 1 / -1;
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 8px;
  }
  
  .small-image {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
  }
  
  @media (max-width: 768px) {
    .hero-section {
      flex-direction: column;
    }
  
    .hero-title {
      font-size: 2.5rem;
    }
  
    .mission-title {
      font-size: 2.5rem;
    }
  
    .image-grid {
      grid-template-columns: 1fr;
    }
  }
  </style>