import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Lightbulb } from 'lucide-react';
import CityDropdown from './CityDropdown';
import QuickAccessCities from './QuickAccessCities';
import DataPointsAnimation from './animations/DataPointsAnimation';
import { useData } from '../data/DataContext';

const Hero = ({ onSearch, initialCity }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { cityData } = useData();

  // Determine if we're on the home page
  const isHomePage = location.pathname === '/';

  const handleCitySelect = (cityData) => {
    if (cityData?.actor_id) {
      // Call the parent handler for any additional logic
      onSearch?.(cityData);

      // Navigate to the city route
      navigate(`/cities/${cityData.actor_id}`);
    }
  };

  // Effect to handle initial city data
  useEffect(() => {
    if (isHomePage && cityData) {
      // If we're on home page but have city data, we might want to show it
      handleCitySelect(cityData);
    }
  }, [isHomePage, cityData]);

  return (
    <div className="hero">
      <div className="container mx-auto px-4 py-24 sm:py-32 flex flex-col lg:flex-row justify-center items-start gap-12 max-w-[1200px]">
        {/* Left column with text */}
        <div className="flex-1 flex flex-col justify-start items-start gap-8">
          <div className="space-y-4">
            <h1 className="w-full">
              <span className="block text-4xl sm:text-5xl font-normal leading-tight font-poppins text-gray-800 mb-2">
                {t('hero:headline.first')}
              </span>
              <span className="block text-4xl sm:text-5xl font-bold leading-tight font-poppins bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                {t('hero:headline.second')}
              </span>
            </h1>
            <p className="text-lg font-normal leading-relaxed tracking-wide font-opensans text-gray-600 max-w-xl">
              {t('hero:description')}
            </p>
          </div>

          {/* Search Container */}
          <div className="w-full max-w-xl bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {t('hero:search.title')}
            </h2>
            <CityDropdown 
              onCityChange={handleCitySelect}
              initialCity={cityData} // Pass cityData as initial value
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

          {!initialCity && (
            <div className="w-full max-w-xl mt-8">
              <h2 className="text-xl font-medium mb-4">{t('hero:ccra_info.title')}</h2>
              <p className="text-gray-600 mb-6">{t('hero:ccra_info.content')}</p>

              <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-blue-800 mb-2">
                    {t('hero:ccra_info.how_to_use.title')}
                  </h3>
                  <ol className="text-blue-700 text-sm space-y-2">
                    {[1, 2, 3, 4, 5].map((step) => (
                      <li key={step}>
                        {step}. {t(`hero:ccra_info.how_to_use.steps.${step}`)}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          )}

          {/* Quick Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">
            <div className="flex items-center gap-3 text-gray-700">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{t('hero:features.data_driven')}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>{t('hero:features.enhanced_ui')}</span>
            </div>
          </div>
        </div>

        {/* Right column - Animation */}
        <div className="flex-1 hidden lg:block justify-center items-start">
          <div className="sticky top-24 w-full h-[500px]">
            <DataPointsAnimation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;