<template>
    <div>
      <HeroSection class="component-spacing"></HeroSection>
      <Carousel class="component-spacing"></Carousel>
      <VideoFeature class="component-spacing"></VideoFeature>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import HeroSection from '@/components/HeroSection.vue';
  import Carousel from '@/components/Carousel.vue';
  import VideoFeature from '@/components/VideoFeature.vue';
  
  onMounted(() => {
    // Emit the link-clicked event when the home page is mounted
    // This ensures the content is visible on initial load
    emit('link-clicked');
  });
  </script>
  
  <style scoped>
  .component-spacing {
    margin-bottom: 35px; 
  }
  
  .component-spacing:last-child {
    margin-bottom: 35px;
  }
  </style>