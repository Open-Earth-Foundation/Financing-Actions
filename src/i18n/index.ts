import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// English translations
import translationEn from './locales/en/translation.json'
// Portuguese translations
import translationPt from './locales/pt-BR/translation.json'
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translationEn,
      },
      'pt-BR': {
         translation: translationPt,
      }
    },
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'developmen',
    ns: [
      'translation',
    ],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;