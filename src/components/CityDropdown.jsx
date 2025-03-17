import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import Select from 'react-select';
import { useData } from '../data/DataContext';
import { ccraApi } from '../api';
import { ALLOWED_CITIES } from '../constants/allowedCities';

const CityDropdown = ({ onCityChange, styles, initialCity }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { cityData } = useData();
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Reset selection when location changes to root
  useEffect(() => {
    if (location.pathname === '/') {
      setSelectedCity(null);
    }
  }, [location]);

  // Filter and format cities
  const cityOptions = React.useMemo(() => {
    if (!cities?.length) return [];

    return cities
      .filter(city => 
        city && city.cityname && 
        ALLOWED_CITIES.includes(city.cityname)
      )
      .map(city => ({
        value: city.actor_id,
        label: city.cityname,
        cityname: city.cityname,
        region: city.region,
        actor_id: city.actor_id,
        osm_id: city.osm_id
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [cities]);

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
    if (selectedOption) {
      onCityChange({
        cityname: selectedOption.cityname,
        region: selectedOption.region,
        actor_id: selectedOption.actor_id,
        osm_id: selectedOption.osm_id
      });
    }
  };

  const customStyles = {
    ...styles,
    control: (provided, state) => ({
      ...provided,
      ...(styles?.control?.(provided, state) ?? {}),
      borderColor: error ? '#ef4444' : provided.borderColor,
    })
  };

  // Effect to fetch cities
  useEffect(() => {
    let isSubscribed = true;

    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const data = await ccraApi.getCities('BR');

        if (!Array.isArray(data)) {
          throw new Error('Invalid city data format');
        }

        if (isSubscribed) {
          const validCities = data.filter(city => 
            city && city.cityname && city.region && city.actor_id
          );
          setCities(validCities);
          setError(null);
        }
      } catch (error) {
        console.error('Error fetching cities:', error);
        if (isSubscribed) {
          setError(!navigator.onLine 
            ? t('error.no_connection')
            : t('error.load_failed', { error: error.message })
          );
        }
      } finally {
        if (isSubscribed) {
          setIsLoading(false);
        }
      }
    };

    fetchCities();
    return () => {
      isSubscribed = false;
    };
  }, [t]);

  // Effect to handle initial city data
  useEffect(() => {
    if (cityData && cities.length > 0) {
      const city = cities.find(c => c.actor_id === cityData.actor_id);
      if (city) {
        const cityOption = {
          value: city.actor_id,
          label: city.cityname,
          cityname: city.cityname,
          region: city.region,
          actor_id: city.actor_id,
          osm_id: city.osm_id
        };
        setSelectedCity(cityOption);
      }
    }
  }, [cityData, cities]);

  if (error) {
    return (
      <div className="space-y-2">
        <div className="p-4 text-sm text-red-500 bg-red-100 rounded-md border border-red-200">
          {error}
        </div>
        <Select
          value={selectedCity}
          options={[]}
          placeholder={t('error.placeholder')}
          isDisabled
          styles={customStyles}
          className="city-dropdown"
          classNamePrefix="city-select"
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 relative">
        <label className="text-sm font-medium text-gray-700">
          {t('city-dropdown:city.label')}
        </label>
        <Select
          value={selectedCity}
          onChange={handleCityChange}
          options={cityOptions}
          placeholder={isLoading 
            ? t('city-dropdown:city.placeholder.loading')
            : t('city-dropdown:city.placeholder.default')
          }
          isClearable
          isLoading={isLoading}
          styles={customStyles}
          className="city-dropdown"
          classNamePrefix="city-select"
        />
      </div>
    </div>
  );
};

export default CityDropdown;