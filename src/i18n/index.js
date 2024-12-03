import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// English translations
import enAssessment from './locales/en/assessment.json';
import enCharts from './locales/en/charts.json';
import enCityDropdown from './locales/en/city-dropdown.json';
import enCommon from './locales/en/common.json';
import enComponents from './locales/en/components.json';
import enFooter from './locales/en/footer.json';
import enHeader from './locales/en/header.json';
import enHero from './locales/en/hero.json';
import enLearnMore from './locales/en/learn-more.json';
import enResilience from './locales/en/resilience.json';
import enRiskAssessment from './locales/en/risk-assessment.json';
import enRiskDetail from './locales/en/risk-detail.json';
import enRiskIntro from './locales/en/risk-intro.json';
import enSections from './locales/en/sections.json';
import enTooltips from './locales/en/tooltips.json';
import enTranslation from './locales/en/translation.json';

// Portuguese translations
import ptBRAssessment from './locales/pt-BR/assessment.json';
import ptBRCharts from './locales/pt-BR/charts.json';
import ptBRCityDropdown from './locales/pt-BR/city-dropdown.json';
import ptBRCommon from './locales/pt-BR/common.json';
import ptBRComponents from './locales/pt-BR/components.json';
import ptBRFooter from './locales/pt-BR/footer.json';
import ptBRHeader from './locales/pt-BR/header.json';
import ptBRHero from './locales/pt-BR/hero.json';
import ptBRLearnMore from './locales/pt-BR/learn-more.json';
import ptBRResilience from './locales/pt-BR/resilience.json';
import ptBRRiskAssessment from './locales/pt-BR/risk-assessment.json';
import ptBRRiskDetail from './locales/pt-BR/risk-detail.json';
import ptBRRiskIntro from './locales/pt-BR/risk-intro.json';
import ptBRSections from './locales/pt-BR/sections.json';
import ptBRTooltips from './locales/pt-BR/tooltips.json';
import ptBRTranslation from './locales/pt-BR/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        assessment: enAssessment,
        charts: enCharts,
        'city-dropdown': enCityDropdown,
        common: enCommon,
        components: enComponents,
        footer: enFooter,
        header: enHeader,
        hero: enHero,
        'learn-more': enLearnMore,
        resilience: enResilience,
        'risk-assessment': enRiskAssessment,
        'risk-detail': enRiskDetail,
        'risk-intro': enRiskIntro,
        sections: enSections,
        tooltips: enTooltips,
        translation: enTranslation
      },
      'pt-BR': {
        assessment: ptBRAssessment,
        charts: ptBRCharts,
        'city-dropdown': ptBRCityDropdown,
        common: ptBRCommon,
        components: ptBRComponents,
        footer: ptBRFooter,
        header: ptBRHeader,
        hero: ptBRHero,
        'learn-more': ptBRLearnMore,
        resilience: ptBRResilience,
        'risk-assessment': ptBRRiskAssessment,
        'risk-detail': ptBRRiskDetail,
        'risk-intro': ptBRRiskIntro,
        sections: ptBRSections,
        tooltips: ptBRTooltips,
        translation: ptBRTranslation
      }
    },
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    ns: [
      'assessment',
      'charts',
      'city-dropdown',
      'common',
      'components',
      'footer',
      'header',
      'hero',
      'learn-more',
      'resilience',
      'risk-assessment',
      'risk-detail',
      'risk-intro',
      'sections',
      'tooltips',
      'translation'
    ],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;