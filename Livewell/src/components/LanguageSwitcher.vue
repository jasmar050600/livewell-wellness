<template>
    <div class="language-switcher">
      <button @click="toggleLanguageMenu" class="language-button" :aria-label="'Current language: ' + getLanguageName(currentLanguage)">
        {{ getFlagEmoji(currentLanguage) }}
        <span class="sr-only">{{ getLanguageName(currentLanguage) }}</span>
      </button>
      <transition name="fade">
        <div v-if="isMenuOpen" class="language-menu" role="menu">
          <button 
            v-for="lang in availableLanguages" 
            :key="lang" 
            @click="changeLanguage(lang)" 
            class="language-option"
            :class="{ 'active': lang === currentLanguage }"
            role="menuitem"
          >
            <span class="flag-emoji">{{ getFlagEmoji(lang) }}</span>
            <span>{{ getLanguageName(lang) }}</span>
          </button>
        </div>
      </transition>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  const props = defineProps({
    currentLanguage: {
      type: String,
      required: true
    },
    availableLanguages: {
      type: Array,
      required: true
    }
  });
  
  const emit = defineEmits(['changeLanguage']);
  
  const isMenuOpen = ref(false);
  
  const toggleLanguageMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
  };
  
  const changeLanguage = (lang) => {
    emit('changeLanguage', lang);
    isMenuOpen.value = false;
  };
  
  const getFlagEmoji = (lang) => {
    const flagEmojis = {
      en: '🇺🇸',
      es: '🇪🇸',
      fr: '🇫🇷',
      de: '🇩🇪',
      it: '🇮🇹',
      pt: '🇵🇹',
      ru: '🇷🇺',
      zh: '🇨🇳',
      ja: '🇯🇵',
      ko: '🇰🇷',
    };
    return flagEmojis[lang] || '🏳️';
  };
  
  const getLanguageName = (lang) => {
    const languageNames = {
      en: 'English',
      es: 'Español',
      fr: 'Français',
      de: 'Deutsch',
      it: 'Italiano',
      pt: 'Português',
      ru: 'Русский',
      zh: '中文',
      ja: '日本語',
      ko: '한국어',
    };
    return languageNames[lang] || lang;
  };
  
  const closeMenuOnOutsideClick = (event) => {
    if (isMenuOpen.value && !event.target.closest('.language-switcher')) {
      isMenuOpen.value = false;
    }
  };
  
  onMounted(() => {
    document.addEventListener('click', closeMenuOnOutsideClick);
  });
  
  onUnmounted(() => {
    document.removeEventListener('click', closeMenuOnOutsideClick);
  });
  </script>
  
  <style scoped>
  .language-switcher {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
  }
  
  .language-button {
    background-color: #4a0e4e;
    color: white;
    border: none;
    width: 60px;
    height: 60px;
    font-size: 30px;
    cursor: pointer;
    border-radius: 50%;
    box-shadow: 0 4px 6px rgba(74, 14, 78, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s, transform 0.2s;
  }
  
  .language-button:hover {
    background-color: #5c1161;
    transform: scale(1.05);
  }
  
  .language-menu {
    position: absolute;
    bottom: 70px;
    right: 0;
    background-color: white;
    border: 1px solid #4a0e4e;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(74, 14, 78, 0.2);
    overflow: hidden;
    width: 220px;
    max-height: 300px;
    overflow-y: auto;
  }
  
  .language-option {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.2s;
    color: #4a0e4e;
  }
  
  .language-option:hover {
    background-color: rgba(74, 14, 78, 0.1);
  }
  
  .language-option.active {
    background-color: rgba(74, 14, 78, 0.2);
    font-weight: bold;
  }
  
  .flag-emoji {
    font-size: 24px;
    margin-right: 12px;
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s, transform 0.3s;
  }
  
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
  }
  
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
  
  @media (max-width: 768px) {
    .language-switcher {
      bottom: 10px;
      right: 10px;
    }
  
    .language-button {
      width: 50px;
      height: 50px;
      font-size: 24px;
    }
  
    .language-menu {
      width: 200px;
      max-height: 250px;
    }
  }
  </style>