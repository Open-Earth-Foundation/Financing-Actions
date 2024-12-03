import React, { useState, useEffect } from "react";
import { useTranslation, I18nextProvider } from 'react-i18next';
import i18n from "./i18n";
import Hero from "./components/Hero";
import RiskAssessment from "./components/RiskAssessment";
import LanguageSelector from './components/LanguageSelector';
import { DataProvider, useData } from "./data/DataContext";
import "./index.css";

const AppContent = () => {
  const { t } = useTranslation(); // Add this line to get the translation function
  const [selectedCity, setSelectedCity] = useState(null);
  const { fetchCityData, riskAssessment, loading, error } = useData();

  // Initialize language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    } else {
      // Detect browser language
      const browserLang = navigator.language;
      if (browserLang.startsWith('pt')) {
        i18n.changeLanguage('pt-BR');
      }
    }
  }, []);

  const handleCityChange = (cityData) => {
    console.log("Selected city:", cityData);
    setSelectedCity(null);
    setTimeout(() => {
      setSelectedCity(cityData);
      if (cityData?.actor_id) {
        fetchCityData(cityData.actor_id, "current");
      }
    }, 0);
  };

  const handleBack = () => {
    setSelectedCity(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="bg-primary text-white p-4">
        <div className="container flex justify-between mx-auto max-w-[1160px] items-center">
          <div className="items-center">
            <h1 className="text-md font-semibold pr-2">{t('header:app_name')}</h1>
            <h1 className="text-xl font-light">{t('header:app_subtitle')}</h1>
          </div>
          <LanguageSelector />
        </div>
      </header>

      <main className="flex-grow">
        <Hero onSearch={handleCityChange} initialCity={selectedCity} />

        {!selectedCity && (
          <div className="container mx-auto px-4 py-10 text-center text-gray-500">
            <p>{t('header:welcome.no_city_selected')}</p>
          </div>
        )}

        {selectedCity && (
          <RiskAssessment
            cityname={selectedCity.cityname}
            region={selectedCity.region}
            actor_id={selectedCity.actor_id}
            loading={loading}
            error={error}
            onBack={handleBack}
          />
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