import React, { useState, useEffect, useRef } from "react";
import { useTranslation, I18nextProvider } from 'react-i18next';
import i18n from "./i18n";
import Hero from "./components/Hero";
import RiskAssessment from "./components/RiskAssessment";
import LanguageSelector from './components/LanguageSelector';
import { DataProvider, useData } from "./data/DataContext";
import "./index.css";
import AssessmentNavigation from './components/RiskAssessment/AssessmentNavigation';

const AppContent = () => {
  const { t } = useTranslation();
  const [selectedCity, setSelectedCity] = useState(null);
  const { fetchCityData, riskAssessment, loading, error } = useData();
  const riskAssessmentRef = useRef(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    } else {
      const browserLang = navigator.language;
      if (browserLang.startsWith('pt')) {
        i18n.changeLanguage('pt-BR');
      }
    }
  }, []);

  const scrollToRiskAssessment = () => {
   if (riskAssessmentRef.current) {
     setTimeout(() => {
       const heroHeight = document.querySelector('.hero')?.offsetHeight || 0;
       const headerHeight = 80;
       window.scrollTo({
         top: heroHeight - headerHeight,
         behavior: 'smooth'
       });
     }, 500); // Increased timeout to allow for component render
   }
  };

  const handleCityChange = (cityData) => {
    setSelectedCity(null);
    setTimeout(() => {
      setSelectedCity(cityData);
      if (cityData?.actor_id) {
        fetchCityData(cityData.actor_id, "current");
        // Wait for component to render and data to load
        setTimeout(scrollToRiskAssessment, 300);
      }
    }, 0);
  };

  const handleBack = () => {
    setSelectedCity(null);
    // Scroll back to top when returning to search
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-blue-50">
      <header className="bg-blue-700 text-white py-3 fixed top-0 w-full z-50 shadow-md min-h-20 justify-center">
        <div className="container flex justify-between mx-auto max-w-[1200px] items-center px-6">
          <div className="flex flex-col justify-center">
            <h2 className="text-xl font-regular tracking-wide">{t('header:app_subtitle')}</h2>
            <h1 className="text-sm font-light text-white opacity-[0.6] tracking-wider mt-0.2">{t('header:app_name')}</h1>

          </div>
          <LanguageSelector />
        </div>
      </header>

      <main className="flex-grow mt-[72px]"> {/* Adjust based on header height */}
        <Hero onSearch={handleCityChange} initialCity={selectedCity} />

        {!selectedCity && (
          <div className="container mx-auto px-4 py-10 text-center text-gray-500">
            <p>{t('header:welcome.no_city_selected')}</p>
          </div>
        )}

        {selectedCity && (
      <div className="flex relative">
        <AssessmentNavigation />
          <RiskAssessment
            ref={riskAssessmentRef}
            cityname={selectedCity.cityname}
            region={selectedCity.region}
            actor_id={selectedCity.actor_id}
            loading={loading}
            error={error}
            onBack={handleBack}
          />
      </div>
        )}
      </main>

      <footer className="bg-gray-100 py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          {t('footer:copyright')}
        </div>
      </footer>
    </div>
  );
};

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </I18nextProvider>
  );
};

export default App;