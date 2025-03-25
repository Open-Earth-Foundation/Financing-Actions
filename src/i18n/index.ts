import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

// English translations
import translationEn from './locales/en/translation.json'
// Portuguese translations
import translationPt from './locales/pt/translation.json'

i18n
    // .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: translationEn,
            },
            'pt': {
                translation: translationPt,
            }
        },
        fallbackLng: 'pt',
        // debug: process.env.NODE_ENV === 'development',
        ns: [
            'translation',
        ],
        defaultNS: 'translation',
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false // This can help with rendering issues
        }
    });

export default i18n;