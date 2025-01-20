import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Hero from "./Hero";
import RiskAssessment from "./RiskAssessment";
import AssessmentNavigation from './RiskAssessment/AssessmentNavigation';
import { useData } from "../data/DataContext";

const CityRoute = () => {
  const { cityId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { 
    fetchCityData, 
    loading, 
    error,
    cityData,
    setRiskAssessment,
    setProjectionData,
    setIndicators,
    setIndicatorCounts,
    setCityData,
    setCurrentResilienceScore
  } = useData();

  const riskAssessmentRef = useRef(null);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  // Handle direct URL access
  useEffect(() => {
    const loadCityData = async () => {
      if (cityId) {
        try {
          await fetchCityData(cityId);
          setInitialLoadComplete(true);
        } catch (error) {
          console.error('Error loading city data:', error);
          navigate('/', { replace: true });
        }
      }
    };

    loadCityData();
  }, [cityId, fetchCityData, navigate]);

  const handleCityChange = async (cityData) => {
    if (cityData?.actor_id) {
      // Reset state before loading new city
      setInitialLoadComplete(false);
      // Navigate and fetch new data
      navigate(`/cities/${cityData.actor_id}`);
      await fetchCityData(cityData.actor_id);
      setInitialLoadComplete(true);
    }
  };

  const handleBack = () => {
    // Reset all state
    setRiskAssessment([]);
    setProjectionData(null);
    setIndicators([]);
    setIndicatorCounts({});
    setCityData(null);
    setCurrentResilienceScore(null);
    setInitialLoadComplete(false);

    // Navigate to home
    navigate('/', { replace: true });

    // Scroll back to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Scroll handling for RiskAssessment
  const scrollToRiskAssessment = () => {
    if (riskAssessmentRef.current) {
      setTimeout(() => {
        const heroHeight = document.querySelector('.hero')?.offsetHeight || 0;
        const headerHeight = 80;
        window.scrollTo({
          top: heroHeight - headerHeight,
          behavior: 'smooth'
        });
      }, 500);
    }
  };

  // Effect for scrolling when city changes
  useEffect(() => {
    if (cityData && initialLoadComplete) {
      scrollToRiskAssessment();
    }
  }, [cityData, initialLoadComplete]);

  return (
    <main className="flex-grow mt-[72px]">
      <Hero 
        onSearch={handleCityChange} 
        initialCity={cityData}
        key={location.pathname}
      />

      {!cityId && (
        <div className="container mx-auto px-4 py-10 text-center text-gray-500">
          <p>{t('header:welcome.no_city_selected')}</p>
        </div>
      )}

      {cityId && cityData && (
        <div className="flex relative">
          <AssessmentNavigation />
          <RiskAssessment
            ref={riskAssessmentRef}
            cityname={cityData.cityname}
            region={cityData.region}
            actor_id={cityId}
            osm_id={cityData.osm_id}
            loading={loading}
            error={error}
            onBack={handleBack}
          />
        </div>
      )}
    </main>
  );
};

export default CityRoute;