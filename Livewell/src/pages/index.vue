<template>
  <div>
    <GlobalHeader class="component-spacing" @link-clicked="showContent = true"></GlobalHeader>
    <transition name="fade">
      <div v-if="showContent" class="component-spacing">
        <template v-if="currentRoute === 'Home'">
          <HeroSection class="component-spacing"></HeroSection>
          <Carousel class="component-spacing"></Carousel>
          <VideoFeature class="component-spacing"></VideoFeature>
        </template>
        <router-view v-else @link-clicked="showContent = true"></router-view>
      </div>
    </transition>
    <GlobalFooter class="component-spacing"></GlobalFooter>
    <LanguageSwitcher
      :current-language="currentLanguage"
      :available-languages="availableLanguages"
      @change-language="changeLanguage"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import GlobalHeader from '@/components/GlobalHeader.vue';
import GlobalFooter from '@/components/GlobalFooter.vue';
import HeroSection from '@/components/HeroSection.vue';
import Carousel from '@/components/Carousel.vue';
import VideoFeature from '@/components/VideoFeature.vue';
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';

const router = useRouter();
const route = useRoute();
const { locale, availableLocales } = useI18n();
const showContent = ref(true);

const currentRoute = computed(() => route.name);

const currentLanguage = computed(() => locale.value);
const availableLanguages = computed(() => availableLocales);

const changeLanguage = (lang) => {
  locale.value = lang;
  // You might want to persist the language choice in localStorage or Vuex store
  localStorage.setItem('language', lang);
};

onMounted(() => {
  // Ensure the content is shown on initial load
  showContent.value = true;
  
  // If the current route is not Home, redirect to Home
  if (route.name !== 'Home') {
    router.push({ name: 'Home' });
  }

  // Load saved language preference if any
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage && availableLocales.includes(savedLanguage)) {
    locale.value = savedLanguage;
  }
});
</script>

<style scoped>
.component-spacing {
  margin-bottom: 35px; 
}

.component-spacing:last-child {
  margin-bottom: 35px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>