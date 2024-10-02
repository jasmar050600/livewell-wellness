<template>
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3 class="footer-title">About Us</h3>
          <p>
            LiveWell Marketing Corporation, founded on July 10, 2024, promotes health awareness and well-being through innovative solutions. Our mission is to empower individuals with quality products and services focused on wellness, envisioning a world where everyone can thrive. Join us in building a healthier future.</p>
        </div>
        <div class="footer-section">
          <h3 class="footer-title">Quick Links</h3>
          <ul class="footer-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">Products</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3 class="footer-title">Connect With Us</h3>
          <div class="social-icons">
            <a href="#" class="social-icon"><span class="material-icons">facebook</span></a>
            <a href="#" class="social-icon"><span class="material-icons">instagram</span></a>
            <a href="#" class="social-icon"><span class="material-icons">twitter</span></a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 LiveWell Marketing Corp. All rights reserved.</p>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'GlobalFooter',
  }
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  
  .footer {
    background-color: #4a0e4e;
    color: #ffffff;
    font-family: 'Poppins', sans-serif;
    padding: 3rem 2rem 1rem;
  }
  
  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  
  .footer-section {
    flex: 1;
    margin-bottom: 2rem;
    min-width: 250px;
    padding-right: 2rem;
  }
  
  .footer-title {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #ffa500;
    font-family: 'Times New Roman', Times, serif;
    font-weight: 300;
  }
  
  .footer-links {
    list-style-type: none;
    padding: 0;
  }
  
  .footer-links li {
    margin-bottom: 0.5rem;
  }
  
  .footer-links a {
    color: #ffffff;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  .footer-links a:hover {
    color: #ffa500;
  }
  
  .social-icons {
    display: flex;
    gap: 1rem;
  }
  
  .social-icon {
    color: #ffffff;
    font-size: 1.5rem;
    transition: color 0.3s ease;
  }
  
  .social-icon:hover {
    color: #ffa500;
  }
  
  .footer-bottom {
    text-align: center;
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  @media (max-width: 768px) {
    .footer-content {
      flex-direction: column;
    }
  
    .footer-section {
      padding-right: 0;
    }
  }
  </style>