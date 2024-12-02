import React from 'react';
import CityDropdown from './CityDropdown';
import QuickAccessCities from './QuickAccessCities';
import DataPointsAnimation from './animations/DataPointsAnimation';

const Hero = ({ onSearch, initialCity }) => {
  const handleCitySelect = (cityData) => {
    onSearch(cityData);
  };

  return (
    <div className="relative">
      <div className="container mx-auto px-4 py-24 sm:py-32 flex flex-col lg:flex-row justify-center items-center gap-12 max-w-[1200px]">
        {/* Left column with text */}
        <div className="flex-1 flex flex-col justify-center items-start gap-8">
          <div className="space-y-4">
            <h1 className="w-full">
              <span className="block text-4xl sm:text-5xl font-normal leading-tight font-poppins text-gray-800 mb-2">
                Know more.
              </span>
              <span className="block text-4xl sm:text-5xl font-bold leading-tight font-poppins bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Prepare better.
              </span>
            </h1>
            <p className="text-lg font-normal leading-relaxed tracking-wide font-opensans text-gray-600 max-w-xl">
              Prepare and adapt your city to potential risks with science-backed insights
            </p>
          </div>

          {/* Search Container */}
          <div className="w-full max-w-xl bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Find your city
            </h2>
            {/* Restored CityDropdown component */}
            <CityDropdown 
              onCityChange={handleCitySelect}
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: 'white',
                  borderColor: '#E5E7EB',
                  '&:hover': {
                    borderColor: '#3B82F6'
                  }
                })
              }}
            />

            {/* Quick Access Cities */}
            <div className="mt-6">
              <QuickAccessCities onCitySelect={handleCitySelect} />
            </div>
          </div>

          {/* Quick Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl mt-4">
            <div className="flex items-center gap-3 text-gray-700">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Data-Driven Insights</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Enhanced User Interface</span>
            </div>
          </div>
        </div>

        {/* Right column - Now with DataPointsAnimation */}
        <div className="flex-1 hidden lg:flex justify-center items-center">
          <div className="relative w-full h-[500px]">
            <DataPointsAnimation />
          </div>
        </div>
        </div>
    </div>
  );
};

export default Hero;