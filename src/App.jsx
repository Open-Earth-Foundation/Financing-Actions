import React, { useState } from "react";
import Hero from "./components/Hero";
import RiskAssessment from "./components/RiskAssessment";
import { DataProvider, useData } from "./data/DataContext";
import "./index.css";
import LanguageSelector from './components/LanguageSelector';


const AppContent = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const { fetchCityData, riskAssessment, loading, error } = useData();

  const handleCityChange = (cityData) => {
    console.log("Selected city:", cityData);
    // Reset the previous city data before setting new city
    setSelectedCity(null);

    // Short timeout to ensure state is cleared before setting new city
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
        <div className="container flex mx-auto max-w-[1160px] align-center">
          <h1 className="text-xl font-semibold pr-2">iCare + Brisa + OpenEarth</h1>
          <h1 className="text-xl font-light">| Climate Change Risk Assessment</h1>
        </div>
      </header>

      <main className="flex-grow">
        <Hero onSearch={handleCityChange} initialCity={selectedCity} />

        {!selectedCity && (
          <div className="container mx-auto px-4 py-10 text-center text-gray-500">
            <p>
              Start by selecting a city to view its Climate Change Risk
              Assessment data.
            </p>
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
          &copy; 2024 CityCatalyst CCRA | All Rights Reserved
        </div>
      </footer>
    </div>
  );
};

const App = () => {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
};

export default App;