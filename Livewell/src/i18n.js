// src/i18n.js
import { createI18n } from 'vue-i18n'

export default createI18n({
  legacy: false, // Set to false to use Composition API
  locale: 'en', // Set default locale
  fallbackLocale: 'en',
  messages: {
    en: {
      // Your English translations
    },
    es: {
      // Spanish translations
    },
    fr: {
      // French translations
    },
    de: {
      // German translations
    },
    zh: {
      // Chinese translations
    },
    ja: {
      // Japanese translations
    },
    ru: {
      // Russian translations
    },
    it: {
      // Italian translations
    },
    pt: {
      // Portuguese translations
    },
    ko: {
      // Korean translations
    }
  }
})
