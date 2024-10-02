<template>
  <div class="app-container">
    <Index />
  </div>
</template>

<script setup>
import Index from '@/pages/index.vue';
</script>

<style>
/* Global styles */
body {
  margin: 0;
  padding: 0;
  background-color: white;
}

.app-container {
  background-color: white;
  min-height: 100vh;
  padding: 10px;
}
</style>