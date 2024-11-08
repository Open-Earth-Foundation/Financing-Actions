import React, { useState } from "react";
import Hero from "./components/Hero";
import RiskAssessment from "./components/RiskAssessment";
import { DataProvider, useData } from "./data/DataContext";
import { exportUtils } from "./utils/exportUtils";
import "./index.css";

// Create a wrapper component to use the DataContext
const AppContent = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const { fetchCityData, riskAssessment, loading, error } = useData();

  const handleSearch = (cityData) => {
    console.log("Selected city:", cityData); // Debug log
    setSelectedCity(cityData);
    if (cityData?.actor_id) {
      fetchCityData(cityData.actor_id, "current");
    }
  };

  const handleBack = () => {
    setSelectedCity(null);
  };

  const handleExportCSV = () => {
    if (!riskAssessment || riskAssessment.length === 0) {
      console.error("No data available to export");
      return;
    }

    // Transform data for CSV export
    const csvData = riskAssessment.map((row) => ({
      Year: row.latest_year,
      "Key Impact": row.keyimpact,
      Hazard: row.hazard,
      "Hazard Score": row.hazard_score,
      "Exposure Score": row.exposure_score,
      "Vulnerability Score": row.vulnerability_score,
      "Risk Score": row.risk_score,
      "Normalized Risk Score": row.normalised_risk_score,
    }));

    exportUtils.exportToCSV(
      csvData,
      `${selectedCity.cityname}_climate_risk_assessment.csv`,
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="bg-primary text-white p-4">
        <div className="container mx-auto max-w-[1160px] align-center">
          <h1 className="text-xl font-semibold">CCRA PoC</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Hero onSearch={handleSearch} initialCity={selectedCity} />

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

      {/* Footer */}
      <footer className="bg-gray-100 py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          &copy; 2024 CityCatalyst CCRA | All Rights Reserved
        </div>
      </footer>
    </div>
  );
};

// Main App component wrapped with DataProvider
const App = () => {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
};

export default App;
